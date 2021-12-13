Hooks.once('init', () => {

	if(typeof Babele !== 'undefined') {

		Babele.get().register({
			module: 'rqg-babele-es',
			lang: 'es',
			dir: 'compendium'
		});
		
		document.getElementById("logo").src="/modules/rqg-babele-es/img/fvtt-rqg-es.webp";
		
	}
});
