<?php

namespace App\Http\Requests\Admin\Movie;

use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Http\FormRequest;

class Update extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::user()->hasRole('admin');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $movieParam = request()->route('movie');
        $movieId = is_object($movieParam) ? $movieParam->id : $movieParam;

        return [
            'name'=> 'required|unique:movies,name,' . $movieId,
            'category'=> 'required',
            'video_url' => 'required|url',
            'thumbnail'=> 'sometimes|nullable|image',
            'rating' => 'required|numeric|min:0|max:5',
            'is_featured' => 'nullable|boolean',
        ];
    }
}
