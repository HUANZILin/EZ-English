<?php

use CodeIgniter\Router\RouteCollection;

/**
 * @var RouteCollection $routes
 */
$routes->options('/(:any)', 'Home::options', ['filter' => 'ApiAccessFilter']);

$routes->get('/', 'VisitorManage::index');
$routes->get('/register', 'VisitorManage::renderRegisterPage');
$routes->post('/register', 'VisitorManage::register');
$routes->get('/login', 'VisitorManage::renderLoginPage');
$routes->post('/login', 'VisitorManage::login');

$routes->group('/', ['filter' => 'JwtAuth'], function($routes)
{
    $routes->get('/home', 'MemberManage::index');

    $routes->get('/editMemberData', 'MemberManage::renderEditMemberDataPage');
    $routes->put('/editMemberData', 'MemberManage::update');
    $routes->delete('/delete', 'MemberManage::delete');

    $routes->get('/addWords', 'WordManage::index');
    $routes->post('/addWords', 'WordManage::create');

    $routes->get('/wordList', 'WordList::index');
    $routes->post('/wordList', 'wordList::search');
    $routes->get('/wordList/(:num)', 'WordList::perWord/$1');

    $routes->get('/collection', 'Collection::index');
    $routes->post('/collection', 'Collection::add');
    $routes->delete('/collection/(:num)', 'Collection::remove/$1');

    $routes->get('/quizData', 'Quiz::index');
    $routes->get('/quizRandom', 'Quiz::quizRandom');
    $routes->get('/quizcollect', 'Quiz::quizcollect');
    $routes->post('/quizcollect', 'Quiz::addQuizData');
});
