<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FeedBackController extends Controller
{
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string|max:255',
        ]);

        if ($validation->fails()) {
            return $this->error('validation error', 500, $validation->errors());
        }
        $feedback = Feedback::create($request->all());
        return $this->success($feedback,'Feedback saved successfully');
    }
}
