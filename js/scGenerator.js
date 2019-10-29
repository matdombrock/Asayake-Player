var cur_type = 'stand-alone';
var sa_sc = {//stand alone shortcode data
	playlistID: '',
	title: '',
	artist: '',
	album: '',
	url: '',
};
var p_sc = [];// playlist shortcode data
function updateType(value){
	//alert(value);
	if(cur_type!=value){
		clearFields();
		if(value=='playlist'){
			document.getElementById('agen-id').value = '';
			p_sc = [];
		}
	}
	cur_type = value;
	if(value=='stand-alone'){
		document.getElementById('agen-stand-alone').classList.remove('hidden');
		document.getElementById('agen-playlist').classList.add('hidden');
	}else{
		document.getElementById('agen-stand-alone').classList.add('hidden');
		document.getElementById('agen-playlist').classList.remove('hidden');
	}
	generateSA_SC();
}
function updateSA_SC(type,value){
	//document.getElementById('agen-sc').innerHTML = value;
	if(type!=null&&value!=null){
		sa_sc[type] = value;
	}
	generateSA_SC();
}
function generateSA_SC(){
	var sc = '';
	if(cur_type == 'playlist'){
		sc += '[aplayer-playlist playlist_id="'+sa_sc["playlistID"]+'"]';
	}else{
		sc += '[ aplayer ';
	}
	if(p_sc.length > 0 && cur_type == 'playlist'){//do many
		for (i = 0; i < p_sc.length; i++) {
			sc += '[ aplayer-playlist-item ';

			sc += 'playlist_id="';
			sc += p_sc[i]["playlistID"];
			sc += '" ';
	
			sc += 'url="';
			sc += p_sc[i]["url"];
			sc += '" ';
		
			sc += 'artist="';
			sc += p_sc[i]["artist"];
			sc += '" '; 
		
			sc += 'album="';
			sc += p_sc[i]["album"];
			sc += '" '; 
		
			sc += 'title="';
			sc += p_sc[i]["title"];
			sc += '" '; 
		
			sc += ']'; 
		}
	}
	//do current
	if(cur_type == 'playlist'){
		sc += '[ aplayer-playlist-item ';
		sc += 'playlist_id="';
		sc += sa_sc["playlistID"];
		sc += '" ';
	}
	sc += 'url="';
	sc += sa_sc["url"];
	sc += '" ';

	sc += 'artist="';
	sc += sa_sc["artist"];
	sc += '" '; 

	sc += 'album="';
	sc += sa_sc["album"];
	sc += '" '; 

	sc += 'title="';
	sc += sa_sc["title"];
	sc += '" '; 

	sc += ']'; 

	document.getElementById('agen-sc').innerHTML = sc;
}
function newTrack(){
	p_sc.push(sa_sc);
	clearFields();
	generateSA_SC();
}
function clearFields(){
	document.getElementById('agen-title').value = '';
	document.getElementById('agen-album').value = '';
	document.getElementById('agen-artist').value = '';
	document.getElementById('agen-url').value = '';
	document.getElementById('agen-title-p').value = '';
	document.getElementById('agen-album-p').value = '';
	document.getElementById('agen-artist-p').value = '';
	document.getElementById('agen-url-p').value = '';
	sa_sc = {//stand alone shortcode data
		playlistID: '',
		title: '',
		artist: '',
		album: '',
		url: '',
	};
}
window.addEventListener('load', function () {
    window.onload = updateType('stand-alone');
});