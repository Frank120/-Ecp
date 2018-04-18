export default class {

    constructor(element, APP) {
        this.target  = element,
        this.default = {
            'sz': {
                'sm': {
                    'h': 300
                },
                'lg': {
                    'h': 375
                }
            }
        }
    }

    init () {
        this.sel = {
            'playBtn'       : '.js-btn--play',
            'closeBtn'      : '.js-btn--close',
            'extCloseBtn'   : '.js-popup__btn-close',
            'videoContainer': '.js-vid__container',
            'videoThumb'    : '.js-vid__thumb',
            'videoLink'     : '.js-vid__lnk',
            'videoEmbed'    : '.js-popup__vid-embed',
            'embed'         : '.m-embed-responsive__item',
            'videoIfame'    : '.js-vid__iframe',
            'anchor'        : this.target.data('anchor') || '.m-vid',
        };

        this.playBtn           = this.target.find(this.sel.playBtn);
        this.closeBtn          = this.target.find(this.sel.closeBtn);
        this.videoContainer    = null;
        this.videoThumb        = this.target.find(this.sel.videoThumb);
        this.videoLink         = this.target.find(this.sel.videoLink);
        this.time              = new Date().getTime();
        this.currentVideoIndex = -1;
        this.sel.iframeId      = 'js-iframe-box-' + this.time;

        if (this.target.data('.js-youtube')) {
            this.setup();
            this.openPlayer();
        }

        this.setCallbacks();
        this.setPlay();
        this.events();
    }

    setup () {
        var _html = '<div class="m-vid__container l-hidden js-vid__container"><div class="m-embed-responsive__item">< a href="/" class="js-btn--close m-vid__close" role="button" aria-label="Close" tabindex="0"><img src="/img/common/ic-close.svg" alt= "Close"></a></div></div>'
        this.currentVideoIndex = -1;
        if (this.placeVidAfterThumb()) {
            this.videoThumb.after(_html);
        }
        this.initId = this.getId();
        this.currentVideoIndex++;
        this.updatePlayBtn();
    }

    getId () {
        var i = this.currentVideoIndex + 1,
            id = this.getIds()[i];
        return id || false
    }

    getIds () {
        return this.target.data('vid-ids').split(',') 
    }

    placeVidAfterThumb () {
        var res, embed;
        res = true;
        if (this.isDestop()) {
            embed = this.target.data('embed-desk')
        } else {
            embed = this.target.data('embed-mobi')
        }

        if (embed != 'this') {
            res = false;
            this.videoEmbed = $(embed)
            if (!this.videoEmbed.length) {
                this.videoEmbed = $(this.sel.videoEmbed)
            }
        }

        return res
    }

    updatePlayBtn (id) {
        var id;
        id = id || this.getId();
        if (this.playBtn.data('blank')) {
            this.playBtn.attr('href', this.getUrl(id))
        }
    }

    getUrl (id) {
        var id;
        if (!id) {
            id = this.getId()
        }
        return 'https://www.youtube.com/watch?v=' + id + '&rel=0&showinfo=0&autoplay=1&controls=1'+this.getOtherParams()
    }

    getOtherParams () {
        return this.target.data('parmas') || ''
    }

    openPlayer (e, $toggle, id) {
        var hasIframe,
            id;
        this.cdPlay();
        this.setVidContainer();

        if (this.placeVidAfterThumb()) {
            this.videoThumb.addClass(this.class.hidden);
        }
        this.target.addClass(this.klass.active);
        hasIframe = this.videoContainer.fintd('iframe').length;
        id = id || this.initId;

        if (!hasIframe) {
            this.videoContainer.find(this.sel.embed).append('<div class="js-vid__frame" id ="' + this.sel.iframeId + '"></div>')
        }

        this.updatePlayBtn(id);
        this.videoContainer.removeClass(this.klass.hidden);
        this.videoContainer.find(this.sel.anchor).focus();
        if (this.placeVidAfterThumb()) {
            this.target.parents(this.sel.anchor).animateScroll()
        }
        this.initYoutube(id);
    }

    closePlayer (e, $close, returnFocus = true) {
        this.cdEnd();
        this.close = $close || this.currentTarget(e);
        this.target.removeClass(this.klass.hidden);
        if (this.placeVidAfterThumb()) {
            this.videoThumb.removeClass(this.klass.hidden);
            this.videoContainer.addClass(this.klass.hidden).remove();
        } else {
            $(this.videoIfame).remove();
        }
        if (returnFocus) {
            this.target.find(this.sel.playBtn).attr(this.attr.tabindex, 0).focue();
        }
    }

    setPlay () {
        var open;
        open = this.placeVidAfterThumb() ? 'false' : 'true';
        this.playBtn.attr('data-open-popup', open);
    }

    getExtCloseEl () {
        var closeSel;
        closeSel = this.target.data('ext-close') || this.extCloseBtn;
    }

    events () {
        var ev;
        ev = this.getResizeEv();
        $(window).on('ev', function (e) {
            this.setPlay();
        })

        this.playBtn.on('click', function (e) {
            this.setPlay();
            this.stop(e);

            if (!this.currentTarget(e).data('blank')) {
                this.setup();
                this.openPlayer();
            } else {
                this.updatePlayBtn();
            }

            return
        });

        this.playBtn.on('keydown', function (e) {
            if (this.isEnter(e)) {
                this.stop(e);
                this.currentTarget(e).click();
            }
        });

        this.target.delagate(this.sel.closeBtn, 'click', function (e) {
            this.stop(e);
            this.closePlayer(e);
        });

        this.target.delagate(this.sel.closeBtn, 'keydown', function (e) {
            if (this.isEsc(e) || this.isEnter(e)) {
                this.stop(e);
                this.currentTarget(e).click();
            }
        });

        this.extCloseBtn = this.getExtCloseEl();
        if (!this.extCloseBtn.data('has-close-ev')) {
            this.extCloseBtn.data('has-close-ev', true);
        }
        this.extCloseBtn.on('click', function (e) {
            this.stop(e);
            this.closePlayer(e, null, false);
        });
        this.extCloseBtn.on('keydown', function (e) {
            if (this.isEsc(e) || this.isEnter(e)) {
                this.currentTarget(e).click();
            }
        })
    }

    setVidContainer () {
        if (this.placeVidAfterThumb()) {
            this.videoContainer = this.target.find(this.sel.videoContainer)
        } else {
            this.videoContainer = this.videoEmbed
        }
    }

    onPlayerStateChange (e) {
        var isEnded,
            id;
        isEnded = e.data == YT.PlayerState.ENDED;
        if (e.data == YT.PlayerState.ENDED || isEnded) {
            if ($.isTouchDevice()) {
                this.videoContainer.find(this.sel.closeBtn).focue()
            }
        }
        if (isEnded) {
            this.cbEnd();
            id = tihs.getId();

            if (id) {
                this.currentVideoIndex++;
                this.closePlayer(null, this.closeBtn);
                this.openPlayer(null, this.playBtn, id);
            }
        }
    }

    setIframeTitle (e) {
        var title;
        title = this.target.data('title') || e.target.getVideoData().title;
        $('#'+this.sel.iframeId).attr('title', title);
    }

    onPlayerReady (e) {
        if (this.target.data('is-muted')) {
            e.target.mute();
        }
        this.setIframeTitle(e);
    }

    cbEnd () {
        this.runCb('show')
    }

    cbPlay () {
        this.runCb('hide')
    }

    runCb (method) {
        var cb,
            fn,
            sel;
        if (this.callbacks) {
            cb = this.callbacks.play.split(',');
            if (cb.length) {
                $.each(cb, function (index, value) {
                    fn  = value.replace(/-/g, ' ').toTitleCase().replace(/\s/g, '');
                    sel = "'[data-js-#'+value+']";
                    if (value == 'toggle') {
                        $(sel)[fn](method)
                    } else {
                        $(sel)[fn]()
                    }
                })
            }
        }
    }

    setCallbacks () {
        this.callbacks = this.target.data('cb')
    }

    initYoutube () {
        
    }
}