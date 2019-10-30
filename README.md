# Asayake (Sunrise) Player
A simple, modular and highly customizable HTML 5 audio player for WordPress with support for playlists. 

![screenshot](https://github.com/matdombrock/asayake-player/blob/master/img/aplayer.png?raw=true)
## Features
* Supports files directly from your WordPress install any other URL.
* No configuration required.
* Easy to use shortcodes.
* Shortcode Generator.
* Full support for both playlists & stand-alone players.
* Playlists automatically play the next song on the list.
* Supports timeline scrubbing.
* "Smart Playback" ensures only one audio source can be playing on the page at once.
* Integrates with almost any theme.
* Highly "themeable" with custom CSS.
* Works with Gutenberg, Classic Editor and most page builders.

## Nerd Features
* Fully HTML5 Compliant. Uses the [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API).
* Pure vanilla Javascript. No external libraries or requirements.

## Usage
Download and install the project to the directory ```plugins/asayake/```.

Activate the plugin.

-------
**Setting up a stand-alone player:**

For a simple "stand-alone" player insert a shortcode like this:
```html
 [aplayer url="http://somesite.com/dope-beat.wav"]
```

You can also supply optional metadata to the shortcode to display the track title, artist and album:
```html
[aplayer url="http://somesite.com/dope-beat.wav" title='Dope Beat' artist='Mathieu Dombrock' album="Imaginary Machines EP"] 
```
-------
**Setting up a playlist:**

Initialize a new playlist with:
```html
[aplayer-playlist playlist_id="test-playlist"]
```
*Here the ```playlist_id``` value can be anything you want but make sure it's UNIQUE.*

Add a new track to the playlist with:
```html
[aplayer-playlist-item  playlist_id="test-playlist" url="http://somesite.com/dope-beat.wav" title='Dope Beat' artist='Mathieu Dombrock' album="Imaginary Machines EP"]
```
*The ```playlist_id``` value here should match the ID you set when you initialized the playlist.*

*Aside from the ```playlist_id``` value, the rest of the parameters match the meta data supplied for the stand-alone player*

*The parameters aside from the ```playlist_id``` value, are optional here as well but highly suggested!*

*The playlist tracks will show up in the order they are inserted into the page, with the first track loading by default.*

