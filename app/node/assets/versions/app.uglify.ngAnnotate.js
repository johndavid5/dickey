var app=angular.module("app",[]);app.controller("PostsCtrl",["$scope","PostsSvc",function(o,t){o.addPost=function(){o.postBody?t.create({username:"dickeyxxx",body:o.postBody}).success(function(t){o.posts.unshift(t),o.postBody=null}).error(function(o){alert("Trouble posting post: '"+o+"'")}):alert("Please enter something in the field before clicking on Add Post!")};var s=!1;s&&(o.posts=[{username:"dickeyxxx",body:"Node rules!"},{username:"jeffdickey",body:"trying out angular.js..."}]);var e="/api/posts";console.log("GET-ting posts from '"+e+"'..."),t.fetch().success(function(t){console.log("Got posts from server: posts = ",t),o.posts=t}).error(function(o){console.log("Trouble getting posts from '"+e+"': err=",o),alert("Trouble getting posts from '"+e+"': "+o)})}]),app.service("PostsSvc",["$http",function(o){this.fetch=function(){return o.get("/api/posts")},this.create=function(t){return o.post("/api/posts",t)}}]);