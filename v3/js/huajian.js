var qdname=getURLParameter('qd');
if(qdname.indexOf('alm')>-1 || qdname.indexOf('iiad')>-1){
	document.writeln('<script src="http://s1.baiwanchuangyi.com/js/track.js"><\/script>');
}

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}