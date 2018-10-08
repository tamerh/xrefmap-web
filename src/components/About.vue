<template>
  <div class="hero-body is-fullheight" v-show="aboutActive">
   <div class="container">
	    <div class="content">
			<p class="has-text-centered is-size-4 has-text-success">About</p>
		    <p>
		    XrefMap is a prototype bioinformatics tool for cross reference retrieval and navigation. It covers around 3 billions records (identifiers, accessions, gene symbols, species name...) with around 18 billions cross reference records.
			  Data generated from EBI Search <a href="https://www.ebi.ac.uk/ebisearch/overview.ebi/statistics" target="_blank">datasets</a>. Different public datasets can be also added.
				</p>
		<p>
		It uses <a href="http://www.mapdb.org/" target="_blank">MapDB</a> and <a href="https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database" target="_blank">LMDB</a> databases for fast bulk inserts and read. 
		It also use similar model like <a href="https://en.wikipedia.org/wiki/MapReduce" target="_blank">MapReduce</a> to prepare data for insertions. Results  are scored(sort) based on how many times they are referenced in databases. All computations runs on EBI research computing cluster.
		</p>
		
		<p>
		This website source code is available <a href="https://github.com/tamerh/xrefmap-web" target="_blank">here</a>. Contributions are welcome.  
		</p>

</div>
</div>
		</div>
</template>

<script>
export default {
	name: 'About',
	props: {
		aboutActive: {
			type: Boolean,
			required: true,
		},
	},
};
</script>
 
<style scoped>
a[target^='_blank']:after {
	/** content: url(http://upload.wikimedia.org/wikipedia/commons/6/64/Icon_External_Link.png);**/
	content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAVklEQVR4Xn3PgQkAMQhDUXfqTu7kTtkpd5RA8AInfArtQ2iRXFWT2QedAfttj2FsPIOE1eCOlEuoWWjgzYaB/IkeGOrxXhqB+uA9Bfcm0lAZuh+YIeAD+cAqSz4kCMUAAAAASUVORK5CYII=);
	margin: 0 0 0 1px;
}
</style>
