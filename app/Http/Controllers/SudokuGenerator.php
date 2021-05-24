<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SudokuGenerator extends Controller
{
    public function __construct(){
        
    }

    public function shuff($list)
    {   $ret = array();
        for($i=sizeof($list)-1;$i>=0;$i--){
            $j = rand(0,$i);
            $k = $list[$j];
            $list[$j] = $list[$i];
            $list[$i] = $k;
        }
        $ret = $list;
        return $ret;
    }

    public function rotate_one($list){
        $a = $list[sizeof($list)-1];
        
        $ret = array();
        
        $ret[] = $a;

        for($i=1;$i<sizeof($list);$i++){
            $ret[$i] = $list[$i-1];
        }

        return $ret;
    }

    public function rotate_three($list){
        $a = $list[sizeof($list)-3];
        $b = $list[sizeof($list)-2];
        $c = $list[sizeof($list)-1];

        $ret = array();

        $ret[] = $a;
        $ret[] = $b;
        $ret[] = $c; 

        for($i=3;$i<sizeof($list);$i++){
            $ret[$i] = $list[$i-3];
        }

        return $ret;
    }

    public function swap_first($list){
        $list2 = array_slice($list, 0, 3);
        $list3 = array_slice($list, 3, 3);
        $list4 = array_slice($list, 6, 3);

        $ret = array();

        $ret = array_merge($ret,$list4);
        $ret = array_merge($ret,$list2);
        $ret = array_merge($ret,$list3);

        return $ret;
    }

    public function swap_second($list){
        $list2 = array_slice($list, 0, 3);
        $list3 = array_slice($list, 3, 3);
        $list4 = array_slice($list, 6, 3);

        $ret = array();

        $ret = array_merge($ret,$list3);
        $ret = array_merge($ret,$list4);
        $ret = array_merge($ret,$list2);

        return $ret;
    }

    public function initialize_soduku(){
        $ret = array();

        $init_list = array(1,2,3,4,5,6,7,8,9);

        $ret[0] = self::shuff($init_list);
        
        $ret[1] = self::rotate_three($ret[0]);
        
        $ret[2] = self::rotate_three($ret[1]);
        
        $ret[3] = self::rotate_one($ret[2]);
        
        $ret[4] = self::swap_first($ret[3]);
        
        $ret[5] = self::swap_second($ret[3]);
        
        $ret[6] = self::rotate_one($ret[5]);
        
        $ret[7] = self::swap_first($ret[6]);
        
        $ret[8] = self::swap_second($ret[6]);

        return $ret;
    }

    public function shuffle_rows($list){
        $ret = array();

        $list2 = array_slice($list, 0, 3);
        $list3 = array_slice($list, 3, 3);
        $list4 = array_slice($list, 6, 3);

        $shuffled_list2 = self::shuff($list2);
        $shuffled_list3 = self::shuff($list3);
        $shuffled_list4 = self::shuff($list4);

        $ret = array_merge($ret,$shuffled_list2);
        $ret = array_merge($ret,$shuffled_list3);
        $ret = array_merge($ret,$shuffled_list4);

        return $ret;
    }

    public function shuffle_blocks($list){
        $ret = array();

        $list2 = array_slice($list, 0, 3);
        $list3 = array_slice($list, 3, 3);
        $list4 = array_slice($list, 6, 3);

        $blocks = array($list2,$list3,$list4);

        $shuffled_blocks = self::shuff($blocks);

        $list2 = $shuffled_blocks[0];
        $list3 = $shuffled_blocks[1];
        $list4 = $shuffled_blocks[2];

        $ret = array_merge($ret, $list2);
        $ret = array_merge($ret, $list3);
        $ret = array_merge($ret, $list4);

        return $ret;
    }

    public function create(){
        $ret = self::initialize_soduku();

        $ret = self::shuffle_rows($ret);

        $ret = self::shuffle_blocks($ret);

        return $ret;
    }
}
