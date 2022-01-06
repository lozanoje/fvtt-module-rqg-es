Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'rqg-babele-es',
			lang: 'es',
			dir: 'compendium'
		});
		
		document.getElementById("logo").src="/modules/rqg-babele-es/images/fvtt-rqg-es.webp";
		
	}
	
});
