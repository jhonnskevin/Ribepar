//imports
importScripts('js/sw-utils.js');

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    //'/',
    'index.html',
    'plugins/bootstrap/css/bootstrap.css',
    'plugins/node-waves/waves.css',
    'plugins/animate-css/animate.css',
    'plugins/sweetalert/sweetalert.css',
    'css/style.css',
    'css/themes/all-themes.css',
   
    

    /*

    'pages/examples/sign-in.html',
    'pages/promotor.html',
    'pages/diario.html',

    'plugins/jquery/jquery.min.js',
    'plugins/bootstrap/js/bootstrap.js',
    'plugins/bootstrap-select/js/bootstrap-select.js',
    'plugins/jquery-slimscroll/jquery.slimscroll.js',
    'plugins/node-waves/waves.js',
    'js/admin.js',
    'js/demo.js',
    'plugins/bootstrap-notify/bootstrap-notify.js',
    'plugins/sweetalert/sweetalert.min.js',
    'js/pages/ui/dialogs.js'*/


];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Roboto:400,700&subset=latin,cyrillic-ext',
    'https://fonts.googleapis.com/icon?family=Material+Icons',

];

self.addEventListener('install', e=> {
    const cacheStatic = caches.open(STATIC_CACHE).then(cache =>
        cache.addAll(APP_SHELL));

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache =>
        cache.addAll(APP_SHELL_INMUTABLE));
    
    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]));
});

self.addEventListener('activate', e => {

    const respuesta = caches.keys().then(keys => {

        keys.forEach(key => {

            if(key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });

    });

    e.waitUntil(respuesta);

});

self.addEventListener('fetch', e => {

    const respuesta = caches.match(e.request).then(res => {

        if(res) {
            return res;
        }else{
            return fetch(e.request).then(newRes =>{
                return actualizaCacheDinamico(DYNAMIC_CACHE, e.request, newRes);
            });
        }
        
    });

    e.respondWith(respuesta);
});