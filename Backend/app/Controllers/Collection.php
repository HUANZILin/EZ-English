<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\CollectModel;
use CodeIgniter\Database\RawSql;

class Collection extends BaseController
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
        //                                     ->where('collect.m_id', $m_id)
        //                                     ->groupBy('words.w_id')
        //                                     ->having('collect', 'true')
        //                                     ->orderBy('latest_datetime','DESC')
        //                                     ->findAll();

        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $returnData['wordsData'] = $builder->select('words.*, IF(collect.created_at=collect.updated_at, "true", "false") AS collect, MAX(practice.created_at) AS latest_datetime, AVG(practice.p_score) AS average_score')
                                        ->join('collect', new RawSql($sql),'left')
                                        ->join('practice', new RawSql($sql2),'left')
                                        ->where('collect.m_id', $m_id)
                                        ->groupBy('words.w_id')
                                        ->having('collect', 'true')
                                        ->orderBy('latest_datetime','DESC')
                                        ->get()
                                        ->getResult();
    
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function add()
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getPost();
        $w_id = $data['w_id'] ?? null;

        if($w_id === null || $w_id === " ") {
            return $this->fail("請輸入單字", 404);
        }

        // $wordsModel = new WordsModel();
        // $verifyWordData = $wordsModel->where('w_id', $w_id)->first();

        $db      = \Config\Database::connect();
        $builder = $db->table('words');
        $verifyWordData = $builder->where('w_id', $w_id)
                                        ->get()
                                        ->getResult();

        if($verifyWordData === null) {
            return $this->fail("查無此單字", 404);
        }
        
        $collectModel = new CollectModel();
        $verifyCollectData = $collectModel->where('m_id', $m_id)->where('w_id', $w_id)->first();

        if($verifyCollectData != null) {
            return $this->fail("重複加入收藏", 404);
        }else{
            $values = [
                'm_id'  =>  $m_id,
                'w_id' =>  $w_id,
            ];
            $collectModel->insert($values);
            $returnData = "加入收藏成功";
        }
        
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function remove($id)
    {
        $m_id = session()->get("memberdata")->m_id;

        $collectModel = new CollectModel();
        $verifyCollectData = $collectModel->where('c_id', $id)->first();

        if($verifyCollectData === null) {
            return $this->fail("查無此收藏", 404);
        }

        if($verifyCollectData['m_id'] != $m_id) {
            return $this->fail("用戶沒有修改權限", 404);
        }

        $collectModel->delete($verifyCollectData['c_id']);
        
        return $this->respond([
            "status" => true,
            "data"   => "移除收藏成功",
            "msg"    => "success"
        ]);
    }

    public function addMulti()
    {
        $m_id = 1;

        for($i=1;$i<200;$i+=2){
            // $wordsModel = new WordsModel();
            // $verifyWordData = $wordsModel->where('w_id', $w_id)->first();

            $db      = \Config\Database::connect();
            $builder = $db->table('words');
            $verifyWordData = $builder->where('w_id', $i)
                                            ->get()
                                            ->getResult();

            if($verifyWordData === null) {
                return $this->fail("查無此單字", 404);
            }
            
            $collectModel = new CollectModel();
            $verifyCollectData = $collectModel->where('m_id', $m_id)->where('w_id', $i)->first();

            if($verifyCollectData != null) {
                $returnData = "重複加入收藏";
            }else{
                $values = [
                    'm_id'  =>  $m_id,
                    'w_id' =>  $i,
                ];
                $collectModel->insert($values);
                $returnData = "加入收藏成功";
            }
        }
        
        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function removeMulti()
    {
        $m_id = 1;

        for($i=2;$i<200;$i+=2){
            $collectModel = new CollectModel();
            $verifyCollectData = $collectModel->where('c_id', $i)->first();

            if($verifyCollectData === null) {
                return $this->fail("查無此收藏", 404);
            }

            if($verifyCollectData['m_id'] != $m_id) {
                return $this->fail("用戶沒有修改權限", 404);
            }

            $collectModel->delete($verifyCollectData['c_id']);
        }
        
        return $this->respond([
            "status" => true,
            "data"   => "success",
            "msg"    => "success"
        ]);
    }
}
