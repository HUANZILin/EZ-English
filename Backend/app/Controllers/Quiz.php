<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\WordsModel;
use App\Models\CollectModel;
use App\Models\PracticeModel;
use CodeIgniter\Database\RawSql;

class Quiz extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = practice.w_id and practice.m_id = '{$m_id}'";
        $sql2 = "collect.w_id = words.w_id and collect.m_id = '{$m_id}'";

        $practiceModel = new PracticeModel();
        $returnData['wordsData'] = $practiceModel->select('words.w_id, words.w_word, words.w_part_of_speech, words.w_chinese, words.w_meaning, words.w_pronunciation, practice.created_at, practice.p_score, practice.p_select')
                                                ->join('collect', new RawSql($sql),'left')
                                                ->join('words', new RawSql($sql2),'left')
                                                ->where('practice.m_id',$m_id)
                                                ->orderBy('created_at', 'DESC')
                                                ->findAll();

        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無此已測驗單字", 404);
        }
        
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
        $sql2 = "practice.w_id = words.w_id and practice.m_id = {$m_id}";

        // $wordsModel = new WordsModel();
        // $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
        //                                     ->join('collect', new RawSql($sql),'left')
        //                                     ->orderBy('title',"RANDOM")
        //                                     ->limit(10)
        //                                     ->find();

        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $returnData['wordsData'] = $builder->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
                                        ->join('collect', new RawSql($sql),'left')
                                        ->join('practice', new RawSql($sql2),'left')
                                        ->groupBy('words.w_id')
                                        ->orderBy('title','RANDOM')
                                        ->limit(10)
                                        ->get()
                                        ->getResult();
        
        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無單字", 404);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function quizCollect()
    {
        $m_id = session()->get("memberdata")->m_id;

        $sql = "collect.w_id = words.w_id and collect.m_id = {$m_id}";
        $sql2 = "practice.w_id = words.w_id and practice.m_id = {$m_id}";

        // $wordsModel = new WordsModel();
        // $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
        //                                     ->join('collect', new RawSql($sql),'left')
        //                                     ->where('collect.m_id', $m_id)
        //                                     ->where('collect.created_at=collect.updated_at')
        //                                     ->orderBy('title',"RANDOM")
        //                                     ->limit(10)
        //                                     ->find();

        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $returnData['wordsData'] = $builder->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
                                        ->join('collect', new RawSql($sql),'left')
                                        ->join('practice', new RawSql($sql2),'left')
                                        ->where('collect.m_id', $m_id)
                                        ->groupBy('words.w_id')
                                        ->having('collect', 'true')
                                        ->orderBy('title',"RANDOM")
                                        ->limit(10)
                                        ->get()
                                        ->getResult();
        
        if($returnData['wordsData'] === null || empty($returnData['wordsData'])) {
            return $this->fail("查無收藏單字", 404);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function addQuizData()
    {
        $data = $this->request->getPost();
        $m_id = session()->get("memberdata")->m_id;

        $w_id  = $data['w_id'] ?? null;
        $p_select = $data['select'] ?? null;
        $p_score = $data['score'] ?? null;

        if($w_id === null || $p_select === null || $p_score === null) {
            return $this->fail("測驗記錄錯誤", 404);
        }

        if($p_select === '收藏') {
            $collectModel = new CollectModel();
            $verifyCollectData = $collectModel->where('m_id', $m_id)->where('w_id', $w_id)->first();

            if($verifyCollectData === null || empty($verifyCollectData)) {
                return $this->fail("用戶沒有收藏這個單字", 404);
            }
        }

        $practiceModel = new PracticeModel();
        $values = [
            'm_id'  => $m_id,
            'w_id'  => $w_id,
            'p_select' => $p_select,
            'p_score' => $p_score,
        ];
        $practiceModel->insert($values);

        return $this->respond([
            "status" => true,
            "msg"    => "測驗紀錄成功"
        ]);
    }

    public function multiAddQuizData()
    {
        $m_id = 1;

        for($i=0;$i<20;$i+=2){
            $w_id  = 1 + $i;
            $p_select = '收藏';
            $p_score = $i % 3 + 1;

            if($w_id === null || $p_select === null || $p_score === null) {
                return $this->fail("測驗記錄錯誤", 404);
            }
    
            if($p_select === '收藏') {
                $collectModel = new CollectModel();
                $verifyCollectData = $collectModel->where('m_id', $m_id)->where('w_id', $w_id)->first();
    
                if($verifyCollectData === null || empty($verifyCollectData)) {
                    return $this->fail("用戶沒有收藏這個單字", 404);
                }
            }
    
            $practiceModel = new PracticeModel();
            $values = [
                'm_id'  => $m_id,
                'w_id'  => $w_id,
                'p_select' => $p_select,
                'p_score' => $p_score,
            ];
            $practiceModel->insert($values);
        }

        return $this->respond([
            "status" => true,
            "msg"    => "測驗紀錄成功"
        ]);
    }
}
