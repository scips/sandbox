# Video is a lot more than an html5 tag

see also [https://fosdem.org/2018/schedule/event/om_html5/](https://fosdem.org/2018/schedule/event/om_html5/)

by [Jess Portnoy](https://github.com/jessp01) from [Kaltura](jess.portnoy@kaltura.com)

focus on non visual factorswhen you reach a site and see a video.

## History

&gt;video&lt; Opera 2007

Flash video standard -> html5 ...

## Video ingest

### Uploading

HTML5 has File API that could be used with input or drag and drop but not only.

In studio we produce 1000 a day needs automatic ingestion:
* platform API
* directory dropping
* bulk upload of video available elsewhere

Nothing should rely on human being performing action, because it's dumb.

### Transcoding

The user will not play a video from a 16 core + priceless graphic card device.
And he will probably buffer the video and will have a bad experience
The user wants something rapidely available.

Transcoding is the process of converting a video from a format to another.

When viewing we don't need the best quality we want no buffering.
Also not all devices have all the codecs.

codecs used for editing are not the same than codec neede to play

The worst thing you can do is to serve a video that will buffer every 5 frames...

Transoding resolve: network condition (video quality) issue and multiple device codec support

ffmpeg is the tool used at kaltura to transcode

Transcoding vs Encoding

Encoding is taking VHS to digital format. Encoding is transforming analogic to numeric.

### ABR delivery

*Adaptive Bit Rate Delivery*

1. Provide several version of the media entry
2. Provide chunk of small size

## CDN

bandwidth solved now let's address the dig effect or the geolock effect

It's crucial when you need a global audience

## Redundancy

Origin <-> CDN
Solved for the video now the interface must also be available

* API
* FE
* DB
...

## Metadata

* catalog
    * categories
    * channels
    * duration
    * format
    * display name

Everything should be available by API to set and to get

## on the fly repackaging Dash, HDS, HLS

