<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\str;
use App\User;
use Auth;
class UserController extends Controller
{
    //
    public function login(Request $request)
    {

        $credentials = $request->only('email','password');

        if(Auth::attempt($credentials))
        {
            $token=Str::random(80);
            Auth::user()->api_token=$token;
            Auth::user()->save();
            return response()->json(['token'=>$token],200);
        }

        return response()->json(['status'=>'Email or password is Wrong'],403);
    }

    public function verify(Request $request){
        return $request->user()->only('name','email');
    }
}
