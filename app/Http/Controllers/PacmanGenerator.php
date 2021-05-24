<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PacmanGenerator extends Controller
{
    public function __construct(){

    }

    private function initMaze(){
        $emptyArray = array();
        for($i=0;$i<28;$i++){
            $temp = array();
            for($j=0;$j<31;$j++){
                if($i==0 || $i==27){
                    $temp[$j] = 1;
                }
                else if($j==0 || $j==30){
                    $temp[$j] = 1;
                }
                else{
                    $temp[$j] = 0;
                }
            }
            $emptyArray[$i] = $temp;
        }
        return $emptyArray;
    }

    private function fillMaze($list){
        for($i=11;$i<18;$i++){
            $list[$i][15] = 1;
        }
        for($i=12;$i<19;$i++){
            $list[14][$i] = 1;
        }

        for($i=3;$i<10;$i++){
            $list[2][$i] = 1;
            $list[13][$i] = 1;
            $list[15][$i] = 1;
            $list[25][$i] = 1;
        }

        for($i=27;$i>=21;$i--){
            $list[2][$i] = 1;
            $list[13][$i] = 1;
            $list[15][$i] = 1;
            $list[25][$i] = 1;
        }

        for($i=4;$i<=11;$i++){
            $list[$i][2] = 1;
            $list[$i][10] = 1;
            $list[$i][20] = 1;
            $list[$i][28] = 1;
        }

        for($i=23;$i>=17;$i--){
            $list[$i][2] = 1;
            $list[$i][10] = 1;
            $list[$i][20] = 1;
            $list[$i][28] = 1;
        }

        for($i=3;$i<=6;$i++){
            $list[$i][6] = 1;
            $list[$i][24] = 1;
        }

        for($i=10;$i<=12;$i++){
            $list[$i][6] = 1;
            $list[$i][24] = 1;
        }

        for($i=16;$i<=19;$i++){
            $list[$i][6] = 1;
            $list[$i][24] = 1;
        }

        for($i=23;$i<=24;$i++){
            $list[$i][6] = 1;
            $list[$i][24] = 1; 
        }

        for($i=3;$i<=5;$i++){
            $list[8][$i] = 1;
            $list[21][$i] = 1;
        }

        for($i=7;$i<=9;$i++){
            $list[8][$i] = 1;
            $list[21][$i] = 1;
        }

        for($i=21;$i<=23;$i++){
            $list[8][$i] = 1;
            $list[21][$i] = 1;
        }

        for($i=25;$i<=27;$i++){
            $list[8][$i] = 1;
            $list[21][$i] = 1;
        }

        return $list;
    }

    public function create(){
        $list = self::initMaze();
        $list = self::fillMaze($list);
        return $list;
    }
}
