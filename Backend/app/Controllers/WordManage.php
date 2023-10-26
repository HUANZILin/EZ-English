<?php

namespace App\Controllers;

use App\Controllers\BaseController;
use CodeIgniter\API\ResponseTrait;
use App\Models\WordsModel;

class WordManage extends BaseController
{
    use ResponseTrait;

    public function index()
    {
        return $this->respond([
            "status" => true,
            "data"   => "Welcome addWords",
            "msg"    => "Welcome addWords"
        ]);
    }

    public function create()
    {
        $data = $this->request->getPost();
        $wordsArr=explode(",", $data['words']);

        $returnData = [];

        foreach($wordsArr as $item){
            $word = $item;
            try {
                $def = $this->getWordnikDefinition($item);
                $part_of_speech = $def[0];
                $meaning = $def[1];
                $pronunciation= $this->getWordnikPronunciations($item);
                $chinese = $this->getMicrosoftTranslation($item);   
                
                array_push($returnData, [$word, $chinese, $meaning, $part_of_speech, $pronunciation]);

                $values = [
                    'm_id'             => 1,
                    'w_word'           => (string)$word,
                    'w_part_of_speech' => (string)$part_of_speech,
                    'w_chinese'        => (string)$chinese,
                    'w_meaning'        => (string)$meaning,
                    'w_pronunciation' => (string)$pronunciation,
                ];
                $wordsModel = new WordsModel();
                $wordsModel->insert($values);
            } catch(\Exception $e) {
                array_push($returnData, [$word, $e]);
            }
        } 

        return $this->respond([
            "status" => true,
            "data"   => $returnData,
            "msg"    => "seccess"
        ]);
    }

    public function getWordnikPronunciations($word)
    {
        $apiKeyWordnik = $_ENV['API_KEY_Wordnik'];

        $uri = "https://api.wordnik.com/v4/word.json/" . $word . "/pronunciations?useCanonical=false&typeFormat=IPA&limit=1&api_key=" . $apiKeyWordnik;
        $response = json_decode(file_get_contents($uri));

        return $response[0]->raw;
    }

    public function getWordnikDefinition($word)
    {
        $apiKeyWebster = $_ENV['API_KEY_Dictionary'];

        $uri = "https://www.dictionaryapi.com/api/v3/references/collegiate/json/" . $word . "?key=" . $apiKeyWebster;

        $apiResponse = file_get_contents($uri);
        $dataArray = json_decode($apiResponse);

        $wordInfoArr = [];

        $part_of_speech = $dataArray[0]->fl;
        $definition = $dataArray[0]->shortdef[0];
        array_push($wordInfoArr, $part_of_speech, $definition);

        return $wordInfoArr;
    }

    public function getMicrosoftTranslation($word)
    {
        $endpoint = "https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=en&to=zh-Hant";

        $apiKeyTranslation = $_ENV['API_KEY_Translation'];

        $content = array(
            array(
                'Text' => $word,
            ),
        );

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL, $endpoint);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($content));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Ocp-Apim-Subscription-Key: ' . $apiKeyTranslation,
            'Ocp-Apim-Subscription-Region: southeastasia',
            'Content-Type: application/json'
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        $transText = json_decode($response);

        return $transText[0]->translations[0]->text;
    }
}
