<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\WordsModel;
use CodeIgniter\Database\RawSql;

class WordList extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";
        $sql2 = "practice.w_id = words.w_id and practice.m_id = {$m_id}";

        // $wordsModel = new WordsModel();
        // $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
        //                                     ->join('collect', new RawSql($sql),'left')
        //                                     ->join('practice', new RawSql($sql2),'left')
        //                                     ->groupBy('words.w_id')
        //                                     ->orderBy('latest_datetime','DESC')
        //                                     ->findAll();
        
        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $returnData['wordsData'] = $builder->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
                                        ->join('collect', new RawSql($sql),'left')
                                        ->join('practice', new RawSql($sql2),'left')
                                        ->groupBy('words.w_id')
                                        ->orderBy('latest_datetime','DESC')
                                        ->get()
                                        ->getResult();

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

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";
        $sql2 = "practice.w_id = words.w_id and practice.m_id = {$m_id}";

        // $wordsModel = new WordsModel();
        // $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
        //                                     ->join('collect', new RawSql($sql),'left')
        //                                     ->join('practice', new RawSql($sql2),'left')
        //                                     ->like('words.w_word', $word)
        //                                     ->groupBy('words.w_id')
        //                                     ->orderBy('latest_datetime','DESC')
        //                                     ->findAll() ?? null;

        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $returnData['wordsData'] = $builder->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
                                        ->join('collect', new RawSql($sql),'left')
                                        ->join('practice', new RawSql($sql2),'left')
                                        ->like('words.w_word', $word)
                                        ->groupBy('words.w_id')
                                        ->orderBy('latest_datetime','DESC')
                                        ->get()
                                        ->getResult();

        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無相關單字", 404);
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

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";
        $sql2 = "practice.w_id = words.w_id and practice.m_id = {$m_id}";

        // $wordsModel = new WordsModel();
        // $returnData['wordData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
        //                                     ->join('collect', new RawSql($sql),'left')
        //                                     ->join('practice', new RawSql($sql2),'left')
        //                                     ->where('words.w_id', $id)
        //                                     ->groupBy('words.w_id')
        //                                     ->findAll() ?? null;

        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $returnData['wordData'] = $builder->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
                                        ->join('collect', new RawSql($sql),'left')
                                        ->join('practice', new RawSql($sql2),'left')
                                        ->where('words.w_id', $id)
                                        ->groupBy('words.w_id')
                                        ->get()
                                        ->getResult();

        if($returnData['wordData'] === null || empty($returnData['wordData'])) {
            return $this->fail("查無此單字", 404);
        }
        
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }
}
