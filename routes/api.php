<?php

use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

// Route::post('/register', [AuthController::class, 'register']);
// Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// route::middleware('auth:sanctum')->get('/user', function (Request $request) {    return $request->user(); });

Route::middleware('auth:sanctum')->group(function() {
    // =================================
    // =================================
    //      ABOUT

    Route::get('/about', [App\Http\Controllers\Api\AboutController::class, 'index']);

    Route::get('/about/about-me/profile image', [App\Http\Controllers\Api\AboutController::class, 'AboutProfileImage']);
    Route::post('/about/about-me/profile image/update', [App\Http\Controllers\Api\AboutController::class, 'AboutProfileImageUpdate']);

    Route::get('/about/about-me/profile description', [App\Http\Controllers\Api\AboutController::class, 'AboutProfileDescription']);
    Route::post('/about/about-me/profile description/update', [App\Http\Controllers\Api\AboutController::class, 'AboutProfileDescriptionUpdate']);
    
    Route::get('/about/skills-icons', [App\Http\Controllers\Api\AboutController::class, 'AboutSkills']);
    Route::get('/about/skills-icons/read/{name}', [App\Http\Controllers\Api\AboutController::class, 'AboutSkills']);

    Route::post('/about/skills-icons/create', [App\Http\Controllers\Api\AboutController::class, 'AboutSkillsStore']);
    Route::post('/about/skills-icons/update/{id}', [App\Http\Controllers\Api\AboutController::class, 'AboutSkillsUpdate']);
    Route::post('/about/skills-icons/delete/{id}', [App\Http\Controllers\Api\AboutController::class, 'AboutSkillsDestroy']);

    

    // =================================
    // =================================
    //      SERVICES

    Route::get('/services', function () {
        return redirect('/api/services/read/asc');
    });

    Route::get('/services/read/{sort}', [App\Http\Controllers\Api\ServicesController::class, 'index']);
    Route::get('/services/read/{sort}/{show}', [App\Http\Controllers\Api\ServicesController::class, 'index']);
    Route::get('/services/read/{sort}/{show}/{name}', [App\Http\Controllers\Api\ServicesController::class, 'index']);

    Route::post('/services/create', [App\Http\Controllers\Api\ServicesController::class, 'ServicesStore']);
    Route::post('/services/update/{id}', [App\Http\Controllers\Api\ServicesController::class, 'ServicesUpdate']);
    Route::post('/services/delete/{id}', [App\Http\Controllers\Api\ServicesController::class, 'ServicesDestroy']);


    // =================================
    // =================================
    //      CERTIVICATE

    Route::get('/about/certificate/read/{sort}', function ($sort) {
        return redirect('api/about/certificate/read/' . $sort . '/all');
    });

    Route::get('/about/certificate/read/{sort}/{category}/{show}', function ($sort, $category, $show) {
        return redirect('api/about/certificate/read/' . $sort . '/' . $category . '/' . $show . '/1');
    });

    Route::get('/about/certificate', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificate']);
    Route::get('/about/certificate/read/{sort}/{category}', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificate']);
    Route::get('/about/certificate/read/{sort}/{category}/{show}/{page}', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificate']);
    Route::get('/about/certificate/detail/{category}/{name}', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificateDetail']);

    Route::post('/about/certificate/create', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificateStore']);
    Route::post('/about/certificate/update/{id}', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificateUpdate']);
    Route::post('/about/certificate/delete/{id}', [App\Http\Controllers\Api\AboutController::class, 'AboutCertificateDestroy']);


    // =================================
    // =================================
    //      PROJECT

    Route::get('/project', function () {
        return redirect('/api/project/read/asc');
    });

    Route::get('/project/read', function () {
        return redirect('/api/project/read/asc');
    });

    Route::get('/project/read/{sort}/{show}', function ($sort, $show) {
        return redirect('api/project/read/' . $sort . '/' . $show . '/1');
    });

    Route::get('/project/read/{sort}', [App\Http\Controllers\Api\ProjectController::class, 'index']);
    Route::get('/project/read/{sort}/{show}/{page}', [App\Http\Controllers\Api\ProjectController::class, 'index']);
    Route::get('/project/detail/{name}', [App\Http\Controllers\Api\ProjectController::class, 'ProjectShowByName']);

    Route::post('/project/create', [App\Http\Controllers\Api\ProjectController::class, 'ProjectStore']);
    Route::post('/project/update/{id}', [App\Http\Controllers\Api\ProjectController::class, 'ProjectUpdate']);
    Route::post('/project/delete/{id}', [App\Http\Controllers\Api\ProjectController::class, 'ProjectDestroy']);


    // =================================
    // =================================
    //      BLOG

    Route::get('/blog/list', function () {
        return redirect('api/blog/list/id');
    });

    Route::get( '/blog/list/{sortby}/', function ($sortby) {
        return redirect('api/blog/list' . $sortby . '/asc');
    });

    Route::get( '/blog/list/{sortby}/{sort}/{show}', function ($sortby, $sort, $show) {
        return redirect('api/blog/list/{sortby}/{sort}/{show}' . $sortby . '/' . $sort . '/' . $show . '/1');
    });

    Route::get('/blog', [App\Http\Controllers\Api\BlogController::class, 'blog']);
    Route::get('/blog/list/{sortby}/{sort}', [App\Http\Controllers\Api\BlogController::class, 'blog']);
    Route::get('/blog/list/{sortby}/{sort}/{show}/{page}', [App\Http\Controllers\Api\BlogController::class, 'blog']);
    Route::get('/blog/read/{title}', [App\Http\Controllers\Api\BlogController::class, 'blogDetail']);

    Route::post('/blog/create', [App\Http\Controllers\Api\BlogController::class, 'BlogStore']);
    Route::post('/blog/update/{id}', [App\Http\Controllers\Api\BlogController::class, 'BlogUpdate']);
    Route::post('/blog/delete/{id}', [App\Http\Controllers\Api\BlogController::class, 'BlogDestroy']);

});