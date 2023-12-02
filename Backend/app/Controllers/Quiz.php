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

        $sql = "collect.c_id = practice.c_id and practice.m_id = {$m_id}";
        $sql2 = "collect.w_id = words.w_id and collect.m_id = {$m_id}";

        $practiceModel = new PracticeModel();
        $returnData['wordsData'] = $practiceModel->select('words.w_id, words.w_word, words.w_part_of_speech, words.w_chinese, words.w_meaning, words.w_pronunciation, practice.created_at, practice.p_score')
                                                ->join('collect', new RawSql($sql),'left')
                                                ->join('words', new RawSql($sql2),'left')
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

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
                                            ->join('collect', new RawSql($sql),'left')
                                            ->orderBy('title',"RANDOM")
                                            ->limit(10)
                                            ->find();
        
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

        $wordsModel = new WordsModel();
        $returnData['wordsData'] = $wordsModel->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect')
                                            ->join('collect', new RawSql($sql),'left')
                                            ->where('collect.m_id', $m_id)
                                            ->where('collect.created_at=collect.updated_at')
                                            ->orderBy('title',"RANDOM")
                                            ->limit(10)
                                            ->find();
        
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

        $c_id  = $data['c_id'] ?? null;
        $p_score = $data['score'] ?? null;

        if($c_id === null || $p_score === null) {
            return $this->fail("測驗記錄錯誤", 404);
        }

        $collectModel = new CollectModel();
        $verifyCollectData = $collectModel->where('c_id', $c_id)->first();

        if($verifyCollectData === null) {
            return $this->fail("查無此收藏", 404);
        }

        if($verifyCollectData['m_id'] != $m_id) {
            return $this->fail("用戶沒有修改權限", 404);
        }

        $practiceModel = new PracticeModel();
        $values = [
            'm_id'  => $m_id,
            'c_id'  => $c_id,
            'p_score' => $p_score,
        ];
        $practiceModel->insert($values);

        return $this->respond([
            "status" => true,
            "msg"    => "測驗紀錄成功"
        ]);
    }

    public function mutiAddQuizData()
    {
        $m_id = session()->get("memberdata")->m_id;

        for($i=0;$i<20;$i+=2){
            $c_id  = 151 + $i;
            $p_score = $i % 3 + 1;

            if($c_id === null || $p_score === null) {
                return $this->fail("測驗記錄錯誤", 404);
            }
    
            $collectModel = new CollectModel();
            $verifyCollectData = $collectModel->where('c_id', $c_id)->first();
    
            if($verifyCollectData === null) {
                return $this->fail("查無此收藏", 404);
            }
    
            if($verifyCollectData['m_id'] != $m_id) {
                return $this->fail("用戶沒有修改權限", 404);
            }
    
            $practiceModel = new PracticeModel();
            $values = [
                'm_id'  => $m_id,
                'c_id'  => $c_id,
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
