<template>
  <div>
    <NavBar />
    <SymbolOptions />
    <SymbolContainer />
    <Footer />
  </div>
</template>

<script>
  import NavBar from '@/components/NavBar';
  import Footer from '@/components/Footer';
  import SymbolOptions from '@/components/SymbolOptions';
  import SymbolContainer from '@/components/SymbolContainer';

  export default {
    name: 'Tracker',
    components: {
      NavBar,
      SymbolOptions,
      SymbolContainer,
      Footer
    }
  }
</script>
