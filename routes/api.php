<?php

use Illuminate\Http\Request;
use App\User;
use App\Article;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/auth/register', 'Auth\RegisterController@register');
Route::post('/auth/login', 'Api\Auth\LoginController@login');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/users', function () {
        return User::all();
    });

    Route::get('/articles', function () {
        return Article::paginate(50);
    });

    Route::get('/articles/{id}', function ($id) {
        return Article::findOrFail($id);
    });

    Route::put('/articles/{id}', function ($id, Request $request) {
        $article = Article::findOrFail($id);

        $article->title = $request->get('title');
        $article->slug = $request->get('slug');
        $article->content = $request->get('content');
        $article->save();

        return response('Article Updated!', 200);
    });

    Route::delete('/articles/{id}', function ($id) {
        $article = Article::findOrFail($id);

        $article->delete();

        return response('Article Deleted.', 200);
    });
});
