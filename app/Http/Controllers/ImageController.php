<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Image;
use Response;
use File;

class ImageController extends Controller
{
    public function create(){
        $data = request()->validate([
            'name' => 'required',
            'image' => 'image|required'
        ]);

        $image_path = request('image')->store('uploads','public');

        return Image::create([
            'name' => $data['name'],
            'path' => $image_path
        ]);
    }

    public function getThumbnail(){
        $str = request('thumbnail');

        $image_info = Image::where('name','=',$str)->first();

        $image_path = "/storage/".$image_info['path'];

        return $image_path;
    }

    public function get(){
        $ret = array();

        $image_info = Image::where('name','=','coin')->first();
        $image_path = "/storage/".$image_info['path'];
        
        $ret["coin"] = $image_path;

        $image_info = Image::where('name','=','bg')->first();
        $image_path = "/storage/".$image_info['path'];

        $ret["bg"] = $image_path;

        $image_info = Image::where('name','=','brick')->first();
        $image_path = "/storage/".$image_info['path'];

        $ret["brick"] = $image_path;

        $image_info = Image::where('name','=','ghost')->first();
        $image_path = "/storage/".$image_info['path'];

        $ret["ghost"] = $image_path;

        $image_info = Image::where('name','=','pacman')->first();
        $image_path = "/storage/".$image_info['path'];

        $ret["pacman"] = $image_path;

        $image_info = Image::where('name','=','bg')->first();
        $image_path = "/storage/".$image_info['path'];

        $ret["back"] = $image_path;

        return $ret;
    }
}
