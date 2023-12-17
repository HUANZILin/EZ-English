<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;

class Analysis extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;

        $firstDayOfMonth = date('Y-m-01');
        $lastDayOfMonth = date('Y-m-t');
        
        $db      = \Config\Database::connect();
        $builder = $db->table('practice');
        $returnData['modeMonth'] = $builder->select('practice.p_select, count(*)')
                                        ->where('practice.m_id', $m_id)
                                        ->where("practice.created_at BETWEEN '{$firstDayOfMonth}' AND '{$lastDayOfMonth}'")
                                        ->groupBy('practice.p_select')
                                        ->get()
                                        ->getResult() ?? null;

        $returnData['modeWeek'] = $builder->select('practice.p_select, count(*)')
                                        ->where('practice.m_id', $m_id)
                                        ->where("YEARWEEK(practice.created_at, 1) = YEARWEEK(NOW(), 1)")
                                        ->groupBy('practice.p_select')
                                        ->get()
                                        ->getResult() ?? null;

        $returnData['countWeek'] = $builder->select('practice.created_at, count(*)')
                                        ->where('practice.m_id', $m_id)
                                        ->where("YEARWEEK(practice.created_at, 1) = YEARWEEK(NOW(), 1)")
                                        ->groupBy('DATE(practice.created_at)')
                                        ->get()
                                        ->getResult() ?? null;

        $returnData['avgWeek'] = $builder->select('practice.created_at, AVG(practice.p_score) AS average_score')
                                        ->where('practice.m_id', $m_id)
                                        ->where("YEARWEEK(practice.created_at, 1) = YEARWEEK(NOW(), 1)")
                                        ->groupBy('DATE(practice.created_at)')
                                        ->get()
                                        ->getResult() ?? null;

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }
}
