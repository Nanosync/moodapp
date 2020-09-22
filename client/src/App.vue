<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand to="/">Mood Tracker</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/" :active='$route.name === "Hello"'>Home</b-nav-item>
          <b-nav-item to="/moodlog" :active='$route.name === "MoodLog"'>Mood Log</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  title() {
    return 'Mood Tracker'
  }
}
</script>
