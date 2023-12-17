<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\VideoModel;

class Video extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        $m_id = session()->get("memberdata")->m_id;
        
        $db      = \Config\Database::connect();
        $builder = $db->table('video');
        $returnTemp['videos'] = $builder->where('m_id', $m_id)
                                        ->orderBy('video.created_at','DESC')
                                        ->limit(1)
                                        ->get()
                                        ->getResult() ?? null;

        if($returnTemp['videos'] === null || empty($returnTemp['videos'])) {
            $returnData['videos'] = $this->getYoutubeVideo('video');
        }else{
            $returnData['videos'] = $this->getYoutubeVideo($returnTemp['videos'][0]->v_dialogue);
        }

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function addChat()
    {
        $m_id = session()->get("memberdata")->m_id;

        $data = $this->request->getPost();
        $chat = $data['chat'] ?? null;

        if($chat === null || $chat === " ") {
            return $this->fail("請輸入英語對話", 404);
        }

        $keyword = $this->getKeyWord($chat);

        $videoModel = new VideoModel();
        $values = [
            'm_id' =>  $m_id,
            'v_dialogue' =>  $keyword,
        ];
        $videoModel->insert($values);
        $returnData = "加入影片資料成功";

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "success"
        ]);
    }

    public function getKeyWord($chat)
    {
        $endpoint = "https://api.openai.com/v1/chat/completions";

        $apiKeyChatGPT = $_ENV['API_KEY_ChatGPT'];

        $headers = array(
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKeyChatGPT
        );

        $content = array(
            'model' => 'gpt-3.5-turbo',
            'messages' =>  [
                [
                   "role" => "user",
                   "content" => $chat . '. Consolidate the above dialogue into one word'
               ]
            ],
            'max_tokens' => 128,
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($content));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $response = curl_exec($ch);
        curl_close($ch);

        $myText = json_decode($response);
        $dataText = $myText->choices[0]->message->content;

        return $dataText;
    }

    public function getYoutubeVideo($word)
    {
        $apiKey = $_ENV['API_KEY_Youtube'];

        $uri = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" . $word . "%20TED&key=" . $apiKey . "&type=video&maxResults=4";

        $apiResponse = file_get_contents($uri);

        $myText = json_decode($apiResponse);

        return $myText;
    }
}
