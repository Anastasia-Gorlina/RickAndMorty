<template>
    <div class="not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <router-link to="/RickAndMorty">Go to Episodes</router-link>
    </div>
  </template>
  
  <style scoped lang="scss">
  .not-found {
    text-align: center;
    padding: 50px;
    
    h1 {
      color: #ff4444;
    }
    
    a {
      color: #42b983;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
  </style>