<template>
  <div class="modal" v-bind:class="{ 'is-active' : aboutActive}">
		  <div class="modal-background" @click="$emit('close-about')"></div>
	  <div class="modal-card">
    <header class="modal-card-head is-radiusless" style="padding:10px">
      <p class="modal-card-title has-text-centered">About</p>
            <button class="delete" @click="$emit('close-about')" aria-label="close"></button>
    </header>
    <section class="modal-card-body">
      <div class="content">
		            <p>
		            XrefMap is a prototype bioinformatics tool for cross reference retrieval and navigation. It has built as a side project to experiment different databases and visualizations while working on EBI Search. XrefMap covers around 2.6 billions records (identifiers, accessions, gene symbols, species name...) with their more than 17.8 billions cross reference records.
		</p>
		<p style="margin-top:3px">
		It uses <a href="https://en.wikipedia.org/wiki/B-tree" target="_blank">B+ tree</a> based <a href="http://www.mapdb.org/" target="_blank">MapDB</a> and <a href="https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database" target="_blank">LMDB</a> databases for fast bulk inserts and read. 
		It also use similar model like <a href="https://en.wikipedia.org/wiki/MapReduce" target="_blank">MapReduce</a> to prepare data for insertions. Results  are scored(sort) based on how many times they are annotated in databases. This idea is influenced from this <a href="http://www.matthias-lange.eu/pubs/pdf/BacSchLan11.pdf" target="_blank">paper</a>. All computations runs on EBI research computing cluster.
		</p>
		
		<p style="margin-top:3px">
		This website source code is available <a href="https://github.com/tamerh/xrefmap-web" target="_blank">here</a>. Opening an issues for bugs, feature request or feedback are welcome.
		And note that, this is a prototype which runs on a limited hardware so it can be unavailable at any time.  
		            </p>
		  </div>
	</section>
	</div>
		</div>
		
</template>

<script>
export default {
  name: 'About',
  props: {
      aboutActive: {
      type: Boolean,
      required:true
    }
  }
}
</script>
 
<style scoped>

a[target^="_blank"]:after {
  /** content: url(http://upload.wikimedia.org/wikipedia/commons/6/64/Icon_External_Link.png);**/
  content: "" url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=); 
  margin: 0 0 0 1px;
}
</style>
