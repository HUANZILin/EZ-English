<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\WordsModel;
use App\Models\CollectModel;
use CodeIgniter\Database\RawSql;

class WordList extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
                                            ->join('collect', new RawSql($sql),'left')
                                            ->findAll();
        
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function search()
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getPost();
        $word = $data['word'] ?? null;

        if($word === null || $word === " ") {
            return $this->fail("請輸入單字", 404);
        }

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->like('w_word', $word)->findAll() ?? null;

        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無此單字", 404);
        }

        $w_ids = array_column($returnData['wordsData'], 'w_id');
        $collectModel = new CollectModel();

        for($i=0;$i<count($w_ids);$i++){
            $verifyCollectData = $collectModel->where('w_id', $w_ids[$i])->where('m_id', $m_id)->first();
            if($verifyCollectData === null) {
                $returnData['wordsData'][$i]['collect'] = false;
            }else{
                $returnData['wordsData'][$i]['collect'] = true;
            }
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function perWord($id)
    {
        $m_id = session()->get("memberdata")->m_id;

        $wordsModel = new WordsModel();
        $returnData['wordData'] = $wordsModel->where('w_id', $id)->first();

        if($returnData['wordData'] === null || empty($returnData['wordData'])) {
            return $this->fail("查無此單字", 404);
        }

        $collectModel = new CollectModel();
        $verifyCollectData = $collectModel->where('w_id', $id)->where('m_id', $m_id)->first();

        if($verifyCollectData === null) {
            $returnData['wordData']['collect'] = false;
        }else{
            $returnData['wordData']['collect'] = true;
        }
        
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }
}
