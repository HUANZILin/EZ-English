<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\WordsModel;
use App\Models\CollectModel;
use CodeIgniter\Database\RawSql;

class Quiz extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.deleted_at, "true", "false") AS collect')
                                            ->join('collect', new RawSql($sql),'left')
                                            ->findAll();
        
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function quizRandom()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
                                            ->join('collect', new RawSql($sql),'left')
                                            ->orderBy('title',"RANDOM")
                                            ->limit(20)
                                            ->findAll();
        
        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無單字", 404);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function quizcollect()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
                                            ->join('collect', new RawSql($sql),'left')
                                            ->where('collect.m_id', $m_id)
                                            ->where('collect.created_at=collect.updated_at')
                                            ->orderBy('title',"RANDOM")
                                            ->limit(20)
                                            ->findAll();
        
        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無收藏單字", 404);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }
}
