<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
// The Auto Routing (Legacy) is very dangerous. It is easy to create vulnerable apps
// where controller filters or CSRF protection are bypassed.
// If you don't want to define all routes, please use the Auto Routing (Improved).
// Set `$autoRoutesImproved` to true in `app/Config/Feature.php` and set the following to true.
// $routes->setAutoRoute(false);

/*
 * --------------------------------------------------------------------
 * Route Definitions
 * --------------------------------------------------------------------
 */

// We get a performance increase by specifying the default
// route since we don't have to scan directories.
// $routes->get('/', 'Home::index');

$routes->options('/(:any)', 'Home::options', ['filter' => 'ApiAccessFilter']);

$routes->get('/', 'VisitorManage::index');
$routes->get('/register', 'VisitorManage::renderRegisterPage');
$routes->post('/register', 'VisitorManage::register');
$routes->get('/login', 'VisitorManage::renderLoginPage');
$routes->post('/login', 'VisitorManage::login');

// $routes->get('/send', 'SendEmail::push');
// $routes->get('/addMulti', 'Collection::addMulti');
// $routes->get('/removeMulti', 'Collection::removeMulti');
// $routes->get('/multiAddQuizData', 'Quiz::multiAddQuizData');

$routes->group('/', ['filter' => 'JwtAuth','ApiAccessFilter'], function($routes)
{
    $routes->get('/home', 'MemberManage::index');
    $routes->get('/logout', 'VisitorManage::logout');

    // $routes->get('/editMemberData', 'MemberManage::renderEditMemberDataPage');
    // $routes->put('/editMemberData', 'MemberManage::update');
    // $routes->delete('/delete', 'MemberManage::delete');

    // $routes->get('/addWords', 'WordManage::index');
    // $routes->post('/addWords', 'WordManage::create');

    $routes->get('/wordList', 'WordList::index');
    $routes->post('/wordList', 'WordList::search');
    $routes->get('/wordList/(:num)', 'WordList::perWord/$1');

    $routes->get('/collection', 'Collection::index');
    $routes->post('/collection', 'Collection::add');
    $routes->delete('/collection/(:num)', 'Collection::remove/$1');

    $routes->get('/quizrandom', 'Quiz::quizRandom');
    $routes->get('/quizcollect', 'Quiz::quizCollect');
    $routes->post('/quizData', 'Quiz::addQuizData');

    $routes->get('/analysis', 'Analysis::index');
    $routes->get('/quizData', 'Quiz::index');

    $routes->get('/video', 'Video::index');
    $routes->post('/video', 'Video::addChat');
});

/*
 * --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (is_file(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
