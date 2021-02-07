<template>
  <div>
    <NavBar />
    <RemoveSymbolsBtn />
    <Footer />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import RemoveSymbolsBtn from '@/components/RemoveSymbolsBtn';

export default {
  name: 'Settings',
  components: {
    NavBar,
    Footer,
    RemoveSymbolsBtn
  }
}
</script>
