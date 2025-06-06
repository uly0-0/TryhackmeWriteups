class ModeToggl{
    static get MODE_KEY() {return "mode";}
    static get MODE_ATTR() {return "data-mode";}
    static get DARK_MODE() {return "dark";}
    static get LIGHT_MODE() {return "light";}
    static get ID() {return "mode-toggle";}

    constructor(){
        if(this.hasMode){
            if(this.isDarkMode()){
                if(!this.isSysDarkPrefer){
                    this.setDark();
                }
        } else {
            if(this.isSysDarkPrefer){
                this.setLight();
            }
        }
    }
    let self = this;
    
    /* always follow the system preference */
    this.sysDarkPrefer.addEventListener("change", () => {
        if(self.hasMode){
            if(self.isDarkMode){
                if(!self.isSysDarkPrefer){
                    self.setDark();
                }
            } else{
                if(self.isSysDarkPrefer){
                    self.setLight();
                }
            }
        }
        self.clearMode();
        self.notify();
    });
  }
  /* constructor() */

  get sysDarkPrefers() { return window.matchMedia("(prefers-color-scheme: dark)"); }

  get isSysDarkPrefer() { return this.sysDarkPrefers.matches; }

  get isDarkMode() { return this.mode === ModeToggle.DARK_MODE; }

  get isLightMode() { return this.mode === ModeToggle.LIGHT_MODE; }

  get hasMode() { return this.mode != null; }

  get mode() { return sessionStorage.getItem(ModeToggle.MODE_KEY); }

  /* get the current mode on screen */
  get modeStatus() {
    if (this.isDarkMode
      || (!this.hasMode && this.isSysDarkPrefer)) {
      return ModeToggle.DARK_MODE;
    } else {
      return ModeToggle.LIGHT_MODE;
    }
  }

  setDark() {
    $('html').attr(ModeToggle.MODE_ATTR, ModeToggle.DARK_MODE);
    sessionStorage.setItem(ModeToggle.MODE_KEY, ModeToggle.DARK_MODE);
  }

  setLight() {
    $('html').attr(ModeToggle.MODE_ATTR, ModeToggle.LIGHT_MODE);
    sessionStorage.setItem(ModeToggle.MODE_KEY, ModeToggle.LIGHT_MODE);
  }

  clearMode() {
    $('html').removeAttr(ModeToggle.MODE_ATTR);
    sessionStorage.removeItem(ModeToggle.MODE_KEY);
  }

  /* Notify another plugins that the theme mode has changed */
  notify() {
    window.postMessage({
      direction: ModeToggle.ID,
      message: this.modeStatus
    }, "*");
  }

} /* ModeToggle */

const toggle = new ModeToggle();

function flipMode() {
  if (toggle.hasMode) {
    if (toggle.isSysDarkPrefer) {
      if (toggle.isLightMode) {
        toggle.clearMode();
      } else {
        toggle.setLight();
      }

    } else {
      if (toggle.isDarkMode) {
        toggle.clearMode();
      } else {
        toggle.setDark();
      }
    }

  } else {
    if (toggle.isSysDarkPrefer) {
      toggle.setLight();
    } else {
      toggle.setDark();
    }
  }

  toggle.notify();

} /* flipMode() */
