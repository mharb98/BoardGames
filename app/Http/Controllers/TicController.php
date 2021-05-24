<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TicController extends Controller
{
    private function checkRow($arr){
        $counter = 0;
        for($i = 0;$i < 3;$i++){
            if($arr[$i] == 'X')
                $counter = $counter + 1;
        }

        if($counter == 3){
            return -1;
        }
        else if($counter == 2){
            for($i = 0;$i < 3;$i++){
                if($arr[$i] == null)
                    return $i;
            }
        }
        return -1;
    }
   
    private function generatePossible($arr){
        $ret = array();
        for($i = 0;$i < 3;$i++){
            for($j = 0;$j < 3;$j++){
                if($arr[$i][$j] == null)
                    $ret[] = ($i * 10) + $j; 
            }
        }
        return $ret;
    }

    private function getPosition($arr){
        $list = self::generatePossible($arr);
        $rand = rand(0,sizeof($list)-1);
        return $list[$rand];
    }

    private function checkRows($arr){
        $ret = 0;
        for($i = 0;$i < 3;$i++){
            $ret = self::checkRow($arr[$i]);
            if($ret > -1)
                return ($i * 10) + $ret;
        }
        return $ret;
    }

    private function checkCols($arr){
        $ret = -1;
        for($i = 0;$i < 3;$i++){
            $temp = 0;
            $a = $arr[$temp][$i];
            $b = $arr[$temp+1][$i];
            $c = $arr[$temp+2][$i];
            $list = array($a,$b,$c);
            $ret = $list;
            $ret = self::checkRow($list);
            if($ret > -1)
                return ($ret * 10) + $i;
        }
        return $ret;
    }

    private function checkDiagonals($arr){
        $a = $arr[0][0];
        $b = $arr[1][1];
        $c = $arr[2][2];
        $list = array($a,$b,$c);
        $ret = self::checkRow($list);
        if($ret == 0)
            return 0;
        else if($ret == 1)
            return 11;
        else if($ret == 2)
            return 22;
        

        $a = $arr[0][2];
        $b = $arr[1][1];
        $c = $arr[2][0];
        $list = array($a,$b,$c);
        $ret = self::checkRow($list);
        if($ret == 0)
            return 2;
        else if($ret == 1)
            return 11;
        else if($ret == 2)
            return 20;

        return -1;
    }

    public function solve(){
        $arr = request('board');

        $ret = self::checkRows($arr);
        if($ret > -1)
            return $ret;
        
        $ret = self::checkCols($arr);
        if($ret > -1)
            return $ret;

        $ret = self::checkDiagonals($arr);

        if($ret > -1)
            return $ret;

        $ret = self::getPosition($arr);
        
        return $ret;
    }
}
