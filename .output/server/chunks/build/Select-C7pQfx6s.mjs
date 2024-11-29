import { getCurrentInstance, computed, h, ref, nextTick, watch, onMounted, onBeforeUnmount, onBeforeMount, onDeactivated, onActivated, onBeforeUpdate, onUpdated, useSSRContext, defineComponent, mergeProps, unref, isRef } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { useVModel } from '@vueuse/core';
import { c as cn } from './utils-H80jjgLf.mjs';
import { c as useFieldProps, d as useFieldEmits, e as useField, f as useFieldState, u as useDarkProps, b as useDark, g as addFocusFn, h as debounce, i as useFormProps, j as useFormInputNameAttr, k as fieldValueIsFilled, l as useKeyComposition } from '../_/QForm.mjs';
import { c as createComponent, s as stopAndPrevent, P as Platform, p as prevent, f as addEvt, g as cleanEvt, l as listenOpts, h as client, i as position, j as isDeepEqual, b as stop } from './server.mjs';
import { u as useSizeProps, a as useSize, d as hDir, Q as QIcon, e as hMergeSlotSafely, i as isKeyCode, f as hUniqueSlot, h as hSlot, j as getParentProxy, s as shouldIgnoreKey, b as hMergeSlot } from '../_/vm.mjs';
import { R as Ripple } from '../_/Ripple.mjs';
import { b as useRouterLinkProps, a as useRouterLink } from '../_/use-router-link.mjs';
import { g as getScrollbarWidth, u as useModelToggleProps, a as useTransitionProps, s as scrollTargetProp, b as useModelToggleEmits, c as useTransition, d as useModelToggle, e as usePortal, f as addEscapeKey, r as removeEscapeKey, h as addFocusout, i as removeFocusout, j as getScrollTarget, k as childHasFocus, _ as __nuxt_component_0$1 } from '../_/QDialog.mjs';
import { u as useTick, a as useTimeout } from './Textarea-DeRyVDAj.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';

const QField = createComponent({
  name: 'QField',

  inheritAttrs: false,

  props: {
    ...useFieldProps,

    tag: {
      type: String,
      default: 'label'
    }
  },

  emits: useFieldEmits,

  setup () {
    return useField(
      useFieldState({ tagProp: true })
    )
  }
});

const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};

const QChip = createComponent({
  name: 'QChip',

  props: {
    ...useDarkProps,
    ...useSizeProps,

    dense: Boolean,

    icon: String,
    iconRight: String,
    iconRemove: String,
    iconSelected: String,
    label: [ String, Number ],

    color: String,
    textColor: String,

    modelValue: {
      type: Boolean,
      default: true
    },
    selected: {
      type: Boolean,
      default: null
    },

    square: Boolean,
    outline: Boolean,
    clickable: Boolean,
    removable: Boolean,

    removeAriaLabel: String,

    tabindex: [ String, Number ],
    disable: Boolean,

    ripple: {
      type: [ Boolean, Object ],
      default: true
    }
  },

  emits: [ 'update:modelValue', 'update:selected', 'remove', 'click' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const isDark = useDark(props, $q);
    const sizeStyle = useSize(props, defaultSizes);

    const hasLeftIcon = computed(() => props.selected === true || props.icon !== void 0);

    const leftIcon = computed(() => (
      props.selected === true
        ? props.iconSelected || $q.iconSet.chip.selected
        : props.icon
    ));

    const removeIcon = computed(() => props.iconRemove || $q.iconSet.chip.remove);

    const isClickable = computed(() =>
      props.disable === false
      && (props.clickable === true || props.selected !== null)
    );

    const classes = computed(() => {
      const text = props.outline === true
        ? props.color || props.textColor
        : props.textColor;

      return 'q-chip row inline no-wrap items-center'
        + (props.outline === false && props.color !== void 0 ? ` bg-${ props.color }` : '')
        + (text ? ` text-${ text } q-chip--colored` : '')
        + (props.disable === true ? ' disabled' : '')
        + (props.dense === true ? ' q-chip--dense' : '')
        + (props.outline === true ? ' q-chip--outline' : '')
        + (props.selected === true ? ' q-chip--selected' : '')
        + (isClickable.value === true ? ' q-chip--clickable cursor-pointer non-selectable q-hoverable' : '')
        + (props.square === true ? ' q-chip--square' : '')
        + (isDark.value === true ? ' q-chip--dark q-dark' : '')
    });

    const attributes = computed(() => {
      const chip = props.disable === true
        ? { tabindex: -1, 'aria-disabled': 'true' }
        : { tabindex: props.tabindex || 0 };

      const remove = {
        ...chip,
        role: 'button',
        'aria-hidden': 'false',
        'aria-label': props.removeAriaLabel || $q.lang.label.remove
      };

      return { chip, remove }
    });

    function onKeyup (e) {
      e.keyCode === 13 /* ENTER */ && onClick(e);
    }

    function onClick (e) {
      if (!props.disable) {
        emit('update:selected', !props.selected);
        emit('click', e);
      }
    }

    function onRemove (e) {
      if (e.keyCode === void 0 || e.keyCode === 13) {
        stopAndPrevent(e);
        if (props.disable === false) {
          emit('update:modelValue', false);
          emit('remove');
        }
      }
    }

    function getContent () {
      const child = [];

      isClickable.value === true && child.push(
        h('div', { class: 'q-focus-helper' })
      );

      hasLeftIcon.value === true && child.push(
        h(QIcon, {
          class: 'q-chip__icon q-chip__icon--left',
          name: leftIcon.value
        })
      );

      const label = props.label !== void 0
        ? [ h('div', { class: 'ellipsis' }, [ props.label ]) ]
        : void 0;

      child.push(
        h('div', {
          class: 'q-chip__content col row no-wrap items-center q-anchor--skip'
        }, hMergeSlotSafely(slots.default, label))
      );

      props.iconRight && child.push(
        h(QIcon, {
          class: 'q-chip__icon q-chip__icon--right',
          name: props.iconRight
        })
      );

      props.removable === true && child.push(
        h(QIcon, {
          class: 'q-chip__icon q-chip__icon--remove cursor-pointer',
          name: removeIcon.value,
          ...attributes.value.remove,
          onClick: onRemove,
          onKeyup: onRemove
        })
      );

      return child
    }

    return () => {
      if (props.modelValue === false) return

      const data = {
        class: classes.value,
        style: sizeStyle.value
      };

      isClickable.value === true && Object.assign(
        data,
        attributes.value.chip,
        { onClick, onKeyup }
      );

      return hDir(
        'div',
        data,
        getContent(),
        'ripple',
        props.ripple !== false && props.disable !== true,
        () => [ [ Ripple, props.ripple ] ]
      )
    }
  }
});

const QItem = createComponent({
  name: 'QItem',

  props: {
    ...useDarkProps,
    ...useRouterLinkProps,

    tag: {
      type: String,
      default: 'div'
    },

    active: {
      type: Boolean,
      default: null
    },

    clickable: Boolean,
    dense: Boolean,
    insetLevel: Number,

    tabindex: [ String, Number ],

    focused: Boolean,
    manualFocus: Boolean
  },

  emits: [ 'click', 'keyup' ],

  setup (props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();

    const isDark = useDark(props, $q);
    const { hasLink, linkAttrs, linkClass, linkTag, navigateOnClick } = useRouterLink();

    const rootRef = ref(null);
    const blurTargetRef = ref(null);

    const isActionable = computed(() =>
      props.clickable === true
        || hasLink.value === true
        || props.tag === 'label'
    );

    const isClickable = computed(() =>
      props.disable !== true && isActionable.value === true
    );

    const classes = computed(() =>
      'q-item q-item-type row no-wrap'
      + (props.dense === true ? ' q-item--dense' : '')
      + (isDark.value === true ? ' q-item--dark' : '')
      + (
        hasLink.value === true && props.active === null
          ? linkClass.value
          : (
              props.active === true
                ? ` q-item--active${ props.activeClass !== void 0 ? ` ${ props.activeClass }` : '' }`
                : ''
            )
      )
      + (props.disable === true ? ' disabled' : '')
      + (
        isClickable.value === true
          ? ' q-item--clickable q-link cursor-pointer '
            + (props.manualFocus === true ? 'q-manual-focusable' : 'q-focusable q-hoverable')
            + (props.focused === true ? ' q-manual-focusable--focused' : '')
          : ''
      )
    );

    const style = computed(() => {
      if (props.insetLevel === void 0) {
        return null
      }

      const dir = $q.lang.rtl === true ? 'Right' : 'Left';
      return {
        [ 'padding' + dir ]: (16 + props.insetLevel * 56) + 'px'
      }
    });

    function onClick (e) {
      if (isClickable.value === true) {
        if (blurTargetRef.value !== null) {
          if (e.qKeyEvent !== true && document.activeElement === rootRef.value) {
            blurTargetRef.value.focus();
          }
          else if (document.activeElement === blurTargetRef.value) {
            rootRef.value.focus();
          }
        }

        navigateOnClick(e);
      }
    }

    function onKeyup (e) {
      if (isClickable.value === true && isKeyCode(e, [ 13, 32 ]) === true) {
        stopAndPrevent(e);

        // for ripple
        e.qKeyEvent = true;

        // for click trigger
        const evt = new MouseEvent('click', e);
        evt.qKeyEvent = true;
        rootRef.value.dispatchEvent(evt);
      }

      emit('keyup', e);
    }

    function getContent () {
      const child = hUniqueSlot(slots.default, []);

      isClickable.value === true && child.unshift(
        h('div', { class: 'q-focus-helper', tabindex: -1, ref: blurTargetRef })
      );

      return child
    }

    return () => {
      const data = {
        ref: rootRef,
        class: classes.value,
        style: style.value,
        role: 'listitem',
        onClick,
        onKeyup
      };

      if (isClickable.value === true) {
        data.tabindex = props.tabindex || '0';
        Object.assign(data, linkAttrs.value);
      }
      else if (isActionable.value === true) {
        data[ 'aria-disabled' ] = 'true';
      }

      return h(
        linkTag.value,
        data,
        getContent()
      )
    }
  }
});

const QItemSection = createComponent({
  name: 'QItemSection',

  props: {
    avatar: Boolean,
    thumbnail: Boolean,
    side: Boolean,
    top: Boolean,
    noWrap: Boolean
  },

  setup (props, { slots }) {
    const classes = computed(() =>
      'q-item__section column'
      + ` q-item__section--${ props.avatar === true || props.side === true || props.thumbnail === true ? 'side' : 'main' }`
      + (props.top === true ? ' q-item__section--top justify-start' : ' justify-center')
      + (props.avatar === true ? ' q-item__section--avatar' : '')
      + (props.thumbnail === true ? ' q-item__section--thumbnail' : '')
      + (props.noWrap === true ? ' q-item__section--nowrap' : '')
    );

    return () => h('div', { class: classes.value }, hSlot(slots.default))
  }
});

const QItemLabel = createComponent({
  name: 'QItemLabel',

  props: {
    overline: Boolean,
    caption: Boolean,
    header: Boolean,
    lines: [ Number, String ]
  },

  setup (props, { slots }) {
    const parsedLines = computed(() => parseInt(props.lines, 10));

    const classes = computed(() =>
      'q-item__label'
      + (props.overline === true ? ' q-item__label--overline text-overline' : '')
      + (props.caption === true ? ' q-item__label--caption text-caption' : '')
      + (props.header === true ? ' q-item__label--header' : '')
      + (parsedLines.value === 1 ? ' ellipsis' : '')
    );

    const style = computed(() => {
      return props.lines !== void 0 && parsedLines.value > 1
        ? {
            overflow: 'hidden',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': parsedLines.value
          }
        : null
    });

    return () => h('div', {
      style: style.value,
      class: classes.value
    }, hSlot(slots.default))
  }
});

function clearSelection () {
  if (window.getSelection !== void 0) {
    const selection = window.getSelection();
    if (selection.empty !== void 0) {
      selection.empty();
    }
    else if (selection.removeAllRanges !== void 0) {
      selection.removeAllRanges();
      Platform.is.mobile !== true && selection.addRange(document.createRange());
    }
  }
  else if (document.selection !== void 0) {
    document.selection.empty();
  }
}

const useAnchorStaticProps = {
  /* SSR does not know about Element */
  target: { default: true }
    ,

  noParentEvent: Boolean
};

const useAnchorProps = {
  ...useAnchorStaticProps,
  contextMenu: Boolean
};

function useAnchor ({
  showing,
  avoidEmit, // required for QPopupProxy (true)
  configureAnchorEl // optional
}) {
  const { props, proxy, emit } = getCurrentInstance();

  const anchorEl = ref(null);

  let touchTimer = null;

  function canShow (evt) {
    // abort with no parent configured or on multi-touch
    return anchorEl.value === null
      ? false
      : (evt === void 0 || evt.touches === void 0 || evt.touches.length <= 1)
  }

  const anchorEvents = {};

  if (configureAnchorEl === void 0) {
    // default configureAnchorEl is designed for
    // QMenu & QPopupProxy (which is why it's handled here)

    Object.assign(anchorEvents, {
      hide (evt) {
        proxy.hide(evt);
      },

      toggle (evt) {
        proxy.toggle(evt);
        evt.qAnchorHandled = true;
      },

      toggleKey (evt) {
        isKeyCode(evt, 13) === true && anchorEvents.toggle(evt);
      },

      contextClick (evt) {
        proxy.hide(evt);
        prevent(evt);
        nextTick(() => {
          proxy.show(evt);
          evt.qAnchorHandled = true;
        });
      },

      prevent,

      mobileTouch (evt) {
        anchorEvents.mobileCleanup(evt);

        if (canShow(evt) !== true) {
          return
        }

        proxy.hide(evt);
        anchorEl.value.classList.add('non-selectable');

        const target = evt.target;
        addEvt(anchorEvents, 'anchor', [
          [ target, 'touchmove', 'mobileCleanup', 'passive' ],
          [ target, 'touchend', 'mobileCleanup', 'passive' ],
          [ target, 'touchcancel', 'mobileCleanup', 'passive' ],
          [ anchorEl.value, 'contextmenu', 'prevent', 'notPassive' ]
        ]);

        touchTimer = setTimeout(() => {
          touchTimer = null;
          proxy.show(evt);
          evt.qAnchorHandled = true;
        }, 300);
      },

      mobileCleanup (evt) {
        anchorEl.value.classList.remove('non-selectable');

        if (touchTimer !== null) {
          clearTimeout(touchTimer);
          touchTimer = null;
        }

        if (showing.value === true && evt !== void 0) {
          clearSelection();
        }
      }
    });

    configureAnchorEl = function (context = props.contextMenu) {
      if (props.noParentEvent === true || anchorEl.value === null) return

      let evts;

      if (context === true) {
        if (proxy.$q.platform.is.mobile === true) {
          evts = [
            [ anchorEl.value, 'touchstart', 'mobileTouch', 'passive' ]
          ];
        }
        else {
          evts = [
            [ anchorEl.value, 'mousedown', 'hide', 'passive' ],
            [ anchorEl.value, 'contextmenu', 'contextClick', 'notPassive' ]
          ];
        }
      }
      else {
        evts = [
          [ anchorEl.value, 'click', 'toggle', 'passive' ],
          [ anchorEl.value, 'keyup', 'toggleKey', 'passive' ]
        ];
      }

      addEvt(anchorEvents, 'anchor', evts);
    };
  }

  function unconfigureAnchorEl () {
    cleanEvt(anchorEvents, 'anchor');
  }

  function setAnchorEl (el) {
    anchorEl.value = el;
    while (anchorEl.value.classList.contains('q-anchor--skip')) {
      anchorEl.value = anchorEl.value.parentNode;
    }
    configureAnchorEl();
  }

  function pickAnchorEl () {
    if (props.target === false || props.target === '' || proxy.$el.parentNode === null) {
      anchorEl.value = null;
    }
    else if (props.target === true) {
      setAnchorEl(proxy.$el.parentNode);
    }
    else {
      let el = props.target;

      if (typeof props.target === 'string') {
        try {
          el = document.querySelector(props.target);
        }
        catch (err) {
          el = void 0;
        }
      }

      if (el !== void 0 && el !== null) {
        anchorEl.value = el.$el || el;
        configureAnchorEl();
      }
      else {
        anchorEl.value = null;
        console.error(`Anchor: target "${ props.target }" not found`);
      }
    }
  }

  watch(() => props.contextMenu, val => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
      configureAnchorEl(val);
    }
  });

  watch(() => props.target, () => {
    if (anchorEl.value !== null) {
      unconfigureAnchorEl();
    }

    pickAnchorEl();
  });

  watch(() => props.noParentEvent, val => {
    if (anchorEl.value !== null) {
      if (val === true) {
        unconfigureAnchorEl();
      }
      else {
        configureAnchorEl();
      }
    }
  });

  onMounted(() => {
    pickAnchorEl();

    if (avoidEmit !== true && props.modelValue === true && anchorEl.value === null) {
      emit('update:modelValue', false);
    }
  });

  onBeforeUnmount(() => {
    touchTimer !== null && clearTimeout(touchTimer);
    unconfigureAnchorEl();
  });

  return {
    anchorEl,
    canShow,
    anchorEvents
  }
}

function useScrollTarget (props, configureScrollTarget) {
  const localScrollTarget = ref(null);
  let scrollFn;

  function changeScrollEvent (scrollTarget, fn) {
    const fnProp = `${ fn !== void 0 ? 'add' : 'remove' }EventListener`;
    const fnHandler = fn !== void 0 ? fn : scrollFn;

    if (scrollTarget !== window) {
      scrollTarget[ fnProp ]('scroll', fnHandler, listenOpts.passive);
    }

    window[ fnProp ]('scroll', fnHandler, listenOpts.passive);

    scrollFn = fn;
  }

  function unconfigureScrollTarget () {
    if (localScrollTarget.value !== null) {
      changeScrollEvent(localScrollTarget.value);
      localScrollTarget.value = null;
    }
  }

  const noParentEventWatcher = watch(() => props.noParentEvent, () => {
    if (localScrollTarget.value !== null) {
      unconfigureScrollTarget();
      configureScrollTarget();
    }
  });

  onBeforeUnmount(noParentEventWatcher);

  return {
    localScrollTarget,
    unconfigureScrollTarget,
    changeScrollEvent
  }
}

const portalProxyList = [];

function closePortalMenus (proxy, evt) {
  do {
    if (proxy.$options.name === 'QMenu') {
      proxy.hide(evt);

      // is this a point of separation?
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy)
      }
    }
    else if (proxy.__qPortal === true) {
      // treat it as point of separation if parent is QPopupProxy
      // (so mobile matches desktop behavior)
      // and hide it too
      const parent = getParentProxy(proxy);

      if (parent !== void 0 && parent.$options.name === 'QPopupProxy') {
        proxy.hide(evt);
        return parent
      }
      else {
        return proxy
      }
    }

    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null)
}

const
  { notPassiveCapture } = listenOpts,
  registeredList = [];

function globalHandler (evt) {

  const target = evt.target;

  if (
    target === void 0
    || target.nodeType === 8
    || target.classList.contains('no-pointer-events') === true
  ) {
    return
  }

  // check last portal vm if it's
  // a QDialog and not in seamless mode
  let portalIndex = portalProxyList.length - 1;

  while (portalIndex >= 0) {
    const proxy = portalProxyList[ portalIndex ].$;

    // skip QTooltip portals
    if (proxy.type.name === 'QTooltip') {
      portalIndex--;
      continue
    }

    if (proxy.type.name !== 'QDialog') {
      break
    }

    if (proxy.props.seamless !== true) {
      return
    }

    portalIndex--;
  }

  for (let i = registeredList.length - 1; i >= 0; i--) {
    const state = registeredList[ i ];

    if (
      (
        state.anchorEl.value === null
        || state.anchorEl.value.contains(target) === false
      )
      && (
        target === document.body
        || (
          state.innerRef.value !== null
          && state.innerRef.value.contains(target) === false
        )
      )
    ) {
      // mark the event as being processed by clickOutside
      // used to prevent refocus after menu close
      evt.qClickOutside = true;
      state.onClickOutside(evt);
    }
    else {
      return
    }
  }
}

function addClickOutside (clickOutsideProps) {
  registeredList.push(clickOutsideProps);

  if (registeredList.length === 1) {
    document.addEventListener('mousedown', globalHandler, notPassiveCapture);
    document.addEventListener('touchstart', globalHandler, notPassiveCapture);
  }
}

function removeClickOutside (clickOutsideProps) {
  const index = registeredList.findIndex(h => h === clickOutsideProps);

  if (index !== -1) {
    registeredList.splice(index, 1);

    if (registeredList.length === 0) {

      document.removeEventListener('mousedown', globalHandler, notPassiveCapture);
      document.removeEventListener('touchstart', globalHandler, notPassiveCapture);
    }
  }
}

let vpLeft, vpTop;

function validatePosition (pos) {
  const parts = pos.split(' ');
  if (parts.length !== 2) {
    return false
  }
  if ([ 'top', 'center', 'bottom' ].includes(parts[ 0 ]) !== true) {
    console.error('Anchor/Self position must start with one of top/center/bottom');
    return false
  }
  if ([ 'left', 'middle', 'right', 'start', 'end' ].includes(parts[ 1 ]) !== true) {
    console.error('Anchor/Self position must end with one of left/middle/right/start/end');
    return false
  }
  return true
}

function validateOffset (val) {
  if (!val) { return true }
  if (val.length !== 2) { return false }
  if (typeof val[ 0 ] !== 'number' || typeof val[ 1 ] !== 'number') {
    return false
  }
  return true
}

const horizontalPos = {
  'start#ltr': 'left',
  'start#rtl': 'right',
  'end#ltr': 'right',
  'end#rtl': 'left'
}

;[ 'left', 'middle', 'right' ].forEach(pos => {
  horizontalPos[ `${ pos }#ltr` ] = pos;
  horizontalPos[ `${ pos }#rtl` ] = pos;
});

function parsePosition (pos, rtl) {
  const parts = pos.split(' ');
  return {
    vertical: parts[ 0 ],
    horizontal: horizontalPos[ `${ parts[ 1 ] }#${ rtl === true ? 'rtl' : 'ltr' }` ]
  }
}

function getAnchorProps (el, offset) {
  let { top, left, right, bottom, width, height } = el.getBoundingClientRect();

  if (offset !== void 0) {
    top -= offset[ 1 ];
    left -= offset[ 0 ];
    bottom += offset[ 1 ];
    right += offset[ 0 ];

    width += offset[ 0 ];
    height += offset[ 1 ];
  }

  return {
    top, bottom, height,
    left, right, width,
    middle: left + (right - left) / 2,
    center: top + (bottom - top) / 2
  }
}

function getAbsoluteAnchorProps (el, absoluteOffset, offset) {
  let { top, left } = el.getBoundingClientRect();

  top += absoluteOffset.top;
  left += absoluteOffset.left;

  if (offset !== void 0) {
    top += offset[ 1 ];
    left += offset[ 0 ];
  }

  return {
    top, bottom: top + 1, height: 1,
    left, right: left + 1, width: 1,
    middle: left,
    center: top
  }
}

function getTargetProps (width, height) {
  return {
    top: 0,
    center: height / 2,
    bottom: height,
    left: 0,
    middle: width / 2,
    right: width
  }
}

function getTopLeftProps (anchorProps, targetProps, anchorOrigin, selfOrigin) {
  return {
    top: anchorProps[ anchorOrigin.vertical ] - targetProps[ selfOrigin.vertical ],
    left: anchorProps[ anchorOrigin.horizontal ] - targetProps[ selfOrigin.horizontal ]
  }
}

function setPosition (cfg, retryNumber = 0) {
  if (
    cfg.targetEl === null
    || cfg.anchorEl === null
    || retryNumber > 5 // we should try only a few times
  ) {
    return
  }

  // some browsers report zero height or width because
  // we are trying too early to get these dimensions
  if (cfg.targetEl.offsetHeight === 0 || cfg.targetEl.offsetWidth === 0) {
    setTimeout(() => {
      setPosition(cfg, retryNumber + 1);
    }, 10);
    return
  }

  const {
    targetEl,
    offset,
    anchorEl,
    anchorOrigin,
    selfOrigin,
    absoluteOffset,
    fit,
    cover,
    maxHeight,
    maxWidth
  } = cfg;

  if (client.is.ios === true && window.visualViewport !== void 0) {
    // uses the q-position-engine CSS class

    const el = document.body.style;
    const { offsetLeft: left, offsetTop: top } = window.visualViewport;

    if (left !== vpLeft) {
      el.setProperty('--q-pe-left', left + 'px');
      vpLeft = left;
    }
    if (top !== vpTop) {
      el.setProperty('--q-pe-top', top + 'px');
      vpTop = top;
    }
  }

  // scroll position might change
  // if max-height/-width changes, so we
  // need to restore it after we calculate
  // the new positioning
  const { scrollLeft, scrollTop } = targetEl;

  const anchorProps = absoluteOffset === void 0
    ? getAnchorProps(anchorEl, cover === true ? [ 0, 0 ] : offset)
    : getAbsoluteAnchorProps(anchorEl, absoluteOffset, offset);

  /**
   * We "reset" the critical CSS properties
   * so we can take an accurate measurement.
   *
   * Ensure that targetEl has a max-width & max-height
   * set in CSS and that the value does NOT exceeds 100vw/vh.
   * All users of the position-engine (currently QMenu & QTooltip)
   * have CSS for this.
   */
  Object.assign(targetEl.style, {
    top: 0,
    left: 0,
    minWidth: null,
    minHeight: null,
    maxWidth,
    maxHeight,
    visibility: 'visible'
  });

  const { offsetWidth: origElWidth, offsetHeight: origElHeight } = targetEl;
  const { elWidth, elHeight } = fit === true || cover === true
    ? { elWidth: Math.max(anchorProps.width, origElWidth), elHeight: cover === true ? Math.max(anchorProps.height, origElHeight) : origElHeight }
    : { elWidth: origElWidth, elHeight: origElHeight };

  let elStyle = { maxWidth, maxHeight };

  if (fit === true || cover === true) {
    elStyle.minWidth = anchorProps.width + 'px';
    if (cover === true) {
      elStyle.minHeight = anchorProps.height + 'px';
    }
  }

  Object.assign(targetEl.style, elStyle);

  const targetProps = getTargetProps(elWidth, elHeight);
  let props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);

  if (absoluteOffset === void 0 || offset === void 0) {
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
  }
  else { // we have touch position or context menu with offset
    const { top, left } = props; // cache initial values

    // apply initial boundaries
    applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);

    let hasChanged = false;

    // did it flip vertically?
    if (props.top !== top) {
      hasChanged = true;
      const offsetY = 2 * offset[ 1 ];
      anchorProps.center = anchorProps.top -= offsetY;
      anchorProps.bottom -= offsetY + 2;
    }

    // did it flip horizontally?
    if (props.left !== left) {
      hasChanged = true;
      const offsetX = 2 * offset[ 0 ];
      anchorProps.middle = anchorProps.left -= offsetX;
      anchorProps.right -= offsetX + 2;
    }

    if (hasChanged === true) {
      // re-calculate props with the new anchor
      props = getTopLeftProps(anchorProps, targetProps, anchorOrigin, selfOrigin);

      // and re-apply boundaries
      applyBoundaries(props, anchorProps, targetProps, anchorOrigin, selfOrigin);
    }
  }

  elStyle = {
    top: props.top + 'px',
    left: props.left + 'px'
  };

  if (props.maxHeight !== void 0) {
    elStyle.maxHeight = props.maxHeight + 'px';

    if (anchorProps.height > props.maxHeight) {
      elStyle.minHeight = elStyle.maxHeight;
    }
  }
  if (props.maxWidth !== void 0) {
    elStyle.maxWidth = props.maxWidth + 'px';

    if (anchorProps.width > props.maxWidth) {
      elStyle.minWidth = elStyle.maxWidth;
    }
  }

  Object.assign(targetEl.style, elStyle);

  // restore scroll position
  if (targetEl.scrollTop !== scrollTop) {
    targetEl.scrollTop = scrollTop;
  }
  if (targetEl.scrollLeft !== scrollLeft) {
    targetEl.scrollLeft = scrollLeft;
  }
}

function applyBoundaries (props, anchorProps, targetProps, anchorOrigin, selfOrigin) {
  const
    currentHeight = targetProps.bottom,
    currentWidth = targetProps.right,
    margin = getScrollbarWidth(),
    innerHeight = window.innerHeight - margin,
    innerWidth = document.body.clientWidth;

  if (props.top < 0 || props.top + currentHeight > innerHeight) {
    if (selfOrigin.vertical === 'center') {
      props.top = anchorProps[ anchorOrigin.vertical ] > innerHeight / 2
        ? Math.max(0, innerHeight - currentHeight)
        : 0;
      props.maxHeight = Math.min(currentHeight, innerHeight);
    }
    else if (anchorProps[ anchorOrigin.vertical ] > innerHeight / 2) {
      const anchorY = Math.min(
        innerHeight,
        anchorOrigin.vertical === 'center'
          ? anchorProps.center
          : (anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.bottom : anchorProps.top)
      );
      props.maxHeight = Math.min(currentHeight, anchorY);
      props.top = Math.max(0, anchorY - currentHeight);
    }
    else {
      props.top = Math.max(0, anchorOrigin.vertical === 'center'
        ? anchorProps.center
        : (anchorOrigin.vertical === selfOrigin.vertical ? anchorProps.top : anchorProps.bottom)
      );
      props.maxHeight = Math.min(currentHeight, innerHeight - props.top);
    }
  }

  if (props.left < 0 || props.left + currentWidth > innerWidth) {
    props.maxWidth = Math.min(currentWidth, innerWidth);
    if (selfOrigin.horizontal === 'middle') {
      props.left = anchorProps[ anchorOrigin.horizontal ] > innerWidth / 2
        ? Math.max(0, innerWidth - currentWidth)
        : 0;
    }
    else if (anchorProps[ anchorOrigin.horizontal ] > innerWidth / 2) {
      const anchorX = Math.min(
        innerWidth,
        anchorOrigin.horizontal === 'middle'
          ? anchorProps.middle
          : (anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.right : anchorProps.left)
      );
      props.maxWidth = Math.min(currentWidth, anchorX);
      props.left = Math.max(0, anchorX - props.maxWidth);
    }
    else {
      props.left = Math.max(0, anchorOrigin.horizontal === 'middle'
        ? anchorProps.middle
        : (anchorOrigin.horizontal === selfOrigin.horizontal ? anchorProps.left : anchorProps.right)
      );
      props.maxWidth = Math.min(currentWidth, innerWidth - props.left);
    }
  }
}

const QMenu = createComponent({
  name: 'QMenu',

  inheritAttrs: false,

  props: {
    ...useAnchorProps,
    ...useModelToggleProps,
    ...useDarkProps,
    ...useTransitionProps,

    persistent: Boolean,
    autoClose: Boolean,
    separateClosePopup: Boolean,

    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,

    fit: Boolean,
    cover: Boolean,

    square: Boolean,

    anchor: {
      type: String,
      validator: validatePosition
    },
    self: {
      type: String,
      validator: validatePosition
    },
    offset: {
      type: Array,
      validator: validateOffset
    },

    scrollTarget: scrollTargetProp,

    touchPosition: Boolean,

    maxHeight: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    }
  },

  emits: [
    ...useModelToggleEmits,
    'click', 'escapeKey'
  ],

  setup (props, { slots, emit, attrs }) {
    let refocusTarget = null, absoluteOffset, unwatchPosition, avoidAutoClose;

    const vm = getCurrentInstance();
    const { proxy } = vm;
    const { $q } = proxy;

    const innerRef = ref(null);
    const showing = ref(false);

    const hideOnRouteChange = computed(() =>
      props.persistent !== true
      && props.noRouteDismiss !== true
    );

    const isDark = useDark(props, $q);
    const { registerTick, removeTick } = useTick();
    const { registerTimeout } = useTimeout();
    useTransition(props);
    const { localScrollTarget, changeScrollEvent, unconfigureScrollTarget } = useScrollTarget(props, configureScrollTarget);

    const { anchorEl, canShow } = useAnchor({ showing });

    const { hide } = useModelToggle({
      showing, canShow, handleShow, handleHide,
      hideOnRouteChange,
      processOnMount: true
    });

    const { showPortal, hidePortal, renderPortal } = usePortal();

    const clickOutsideProps = {
      anchorEl,
      innerRef,
      onClickOutside (e) {
        if (props.persistent !== true && showing.value === true) {
          hide(e);

          if (
            // always prevent touch event
            e.type === 'touchstart'
            // prevent click if it's on a dialog backdrop
            || e.target.classList.contains('q-dialog__backdrop')
          ) {
            stopAndPrevent(e);
          }

          return true
        }
      }
    };

    const anchorOrigin = computed(() =>
      parsePosition(
        props.anchor || (
          props.cover === true ? 'center middle' : 'bottom start'
        ),
        $q.lang.rtl
      )
    );

    const selfOrigin = computed(() => (
      props.cover === true
        ? anchorOrigin.value
        : parsePosition(props.self || 'top start', $q.lang.rtl)
    ));

    computed(() =>
      (props.square === true ? ' q-menu--square' : '')
      + (isDark.value === true ? ' q-menu--dark q-dark' : '')
    );

    computed(() => (
      props.autoClose === true
        ? { onClick: onAutoClose }
        : {}
    ));

    const handlesFocus = computed(() =>
      showing.value === true && props.persistent !== true
    );

    watch(handlesFocus, val => {
      if (val === true) {
        addEscapeKey(onEscapeKey);
        addClickOutside(clickOutsideProps);
      }
      else {
        removeEscapeKey(onEscapeKey);
        removeClickOutside(clickOutsideProps);
      }
    });

    function focus () {
      addFocusFn(() => {
        let node = innerRef.value;

        if (node && node.contains(document.activeElement) !== true) {
          node = node.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')
            || node.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')
            || node.querySelector('[autofocus], [data-autofocus]')
            || node;
          node.focus({ preventScroll: true });
        }
      });
    }

    function handleShow (evt) {
      refocusTarget = props.noRefocus === false
        ? document.activeElement
        : null;

      addFocusout(onFocusout);

      showPortal();
      configureScrollTarget();

      absoluteOffset = void 0;

      if (evt !== void 0 && (props.touchPosition || props.contextMenu)) {
        const pos = position(evt);

        if (pos.left !== void 0) {
          const { top, left } = anchorEl.value.getBoundingClientRect();
          absoluteOffset = { left: pos.left - left, top: pos.top - top };
        }
      }

      if (unwatchPosition === void 0) {
        unwatchPosition = watch(
          () => $q.screen.width + '|' + $q.screen.height + '|' + props.self + '|' + props.anchor + '|' + $q.lang.rtl,
          updatePosition
        );
      }

      if (props.noFocus !== true) {
        document.activeElement.blur();
      }

      // should removeTick() if this gets removed
      registerTick(() => {
        updatePosition();
        props.noFocus !== true && focus();
      });

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        // required in order to avoid the "double-tap needed" issue
        if ($q.platform.is.ios === true) {
          // if auto-close, then this click should
          // not close the menu
          avoidAutoClose = props.autoClose;
          innerRef.value.click();
        }

        updatePosition();
        showPortal(true); // done showing portal
        emit('show', evt);
      }, props.transitionDuration);
    }

    function handleHide (evt) {
      removeTick();
      hidePortal();

      anchorCleanup(true);

      if (
        refocusTarget !== null
        && (
          // menu was hidden from code or ESC plugin
          evt === void 0
          // menu was not closed from a mouse or touch clickOutside
          || evt.qClickOutside !== true
        )
      ) {
        ((evt && evt.type.indexOf('key') === 0
          ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])')
          : void 0
        ) || refocusTarget).focus();
        refocusTarget = null;
      }

      // should removeTimeout() if this gets removed
      registerTimeout(() => {
        hidePortal(true); // done hiding, now destroy
        emit('hide', evt);
      }, props.transitionDuration);
    }

    function anchorCleanup (hiding) {
      absoluteOffset = void 0;

      if (unwatchPosition !== void 0) {
        unwatchPosition();
        unwatchPosition = void 0;
      }

      if (hiding === true || showing.value === true) {
        removeFocusout(onFocusout);
        unconfigureScrollTarget();
        removeClickOutside(clickOutsideProps);
        removeEscapeKey(onEscapeKey);
      }

      if (hiding !== true) {
        refocusTarget = null;
      }
    }

    function configureScrollTarget () {
      if (anchorEl.value !== null || props.scrollTarget !== void 0) {
        localScrollTarget.value = getScrollTarget(anchorEl.value, props.scrollTarget);
        changeScrollEvent(localScrollTarget.value, updatePosition);
      }
    }

    function onAutoClose (e) {
      // if auto-close, then the ios double-tap fix which
      // issues a click should not close the menu
      if (avoidAutoClose !== true) {
        closePortalMenus(proxy, e);
        emit('click', e);
      }
      else {
        avoidAutoClose = false;
      }
    }

    function onFocusout (evt) {
      // the focus is not in a vue child component
      if (
        handlesFocus.value === true
        && props.noFocus !== true
        && childHasFocus(innerRef.value, evt.target) !== true
      ) {
        focus();
      }
    }

    function onEscapeKey (evt) {
      emit('escapeKey');
      hide(evt);
    }

    function updatePosition () {
      setPosition({
        targetEl: innerRef.value,
        offset: props.offset,
        anchorEl: anchorEl.value,
        anchorOrigin: anchorOrigin.value,
        selfOrigin: selfOrigin.value,
        absoluteOffset,
        fit: props.fit,
        cover: props.cover,
        maxHeight: props.maxHeight,
        maxWidth: props.maxWidth
      });
    }

    onBeforeUnmount(anchorCleanup);

    // expose public methods
    Object.assign(proxy, { focus, updatePosition });

    return renderPortal
  }
});

const aggBucketSize = 1000;

const scrollToEdges = [
  'start',
  'center',
  'end',
  'start-force',
  'center-force',
  'end-force'
];

const filterProto = Array.prototype.filter;

function sumFn (acc, h) {
  return acc + h
}

function getScrollDetails (
  parent,
  child,
  beforeRef,
  afterRef,
  horizontal,
  rtl,
  stickyStart,
  stickyEnd
) {
  const
    parentCalc = parent === window ? document.scrollingElement || document.documentElement : parent,
    propElSize = horizontal === true ? 'offsetWidth' : 'offsetHeight',
    details = {
      scrollStart: 0,
      scrollViewSize: -stickyStart - stickyEnd,
      scrollMaxSize: 0,
      offsetStart: -stickyStart,
      offsetEnd: -stickyEnd
    };

  if (horizontal === true) {
    if (parent === window) {
      details.scrollStart = window.pageXOffset || window.scrollX || document.body.scrollLeft || 0;
      details.scrollViewSize += document.documentElement.clientWidth;
    }
    else {
      details.scrollStart = parentCalc.scrollLeft;
      details.scrollViewSize += parentCalc.clientWidth;
    }
    details.scrollMaxSize = parentCalc.scrollWidth;

    if (rtl === true) {
      details.scrollStart = (0) - details.scrollStart;
    }
  }
  else {
    if (parent === window) {
      details.scrollStart = window.pageYOffset || window.scrollY || document.body.scrollTop || 0;
      details.scrollViewSize += document.documentElement.clientHeight;
    }
    else {
      details.scrollStart = parentCalc.scrollTop;
      details.scrollViewSize += parentCalc.clientHeight;
    }
    details.scrollMaxSize = parentCalc.scrollHeight;
  }

  if (beforeRef !== null) {
    for (let el = beforeRef.previousElementSibling; el !== null; el = el.previousElementSibling) {
      if (el.classList.contains('q-virtual-scroll--skip') === false) {
        details.offsetStart += el[ propElSize ];
      }
    }
  }

  if (afterRef !== null) {
    for (let el = afterRef.nextElementSibling; el !== null; el = el.nextElementSibling) {
      if (el.classList.contains('q-virtual-scroll--skip') === false) {
        details.offsetEnd += el[ propElSize ];
      }
    }
  }

  if (child !== parent) {
    const
      parentRect = parentCalc.getBoundingClientRect(),
      childRect = child.getBoundingClientRect();

    if (horizontal === true) {
      details.offsetStart += childRect.left - parentRect.left;
      details.offsetEnd -= childRect.width;
    }
    else {
      details.offsetStart += childRect.top - parentRect.top;
      details.offsetEnd -= childRect.height;
    }

    if (parent !== window) {
      details.offsetStart += details.scrollStart;
    }
    details.offsetEnd += details.scrollMaxSize - details.offsetStart;
  }

  return details
}

function setScroll (parent, scroll, horizontal, rtl) {
  if (scroll === 'end') {
    scroll = (parent === window ? document.body : parent)[
      horizontal === true ? 'scrollWidth' : 'scrollHeight'
    ];
  }

  if (parent === window) {
    if (horizontal === true) {
      if (rtl === true) {
        scroll = (0) - scroll;
      }
      window.scrollTo(scroll, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    }
    else {
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, scroll);
    }
  }
  else if (horizontal === true) {
    if (rtl === true) {
      scroll = (0) - scroll;
    }
    parent.scrollLeft = scroll;
  }
  else {
    parent.scrollTop = scroll;
  }
}

function sumSize (sizeAgg, size, from, to) {
  if (from >= to) { return 0 }

  const
    lastTo = size.length,
    fromAgg = Math.floor(from / aggBucketSize),
    toAgg = Math.floor((to - 1) / aggBucketSize) + 1;

  let total = sizeAgg.slice(fromAgg, toAgg).reduce(sumFn, 0);

  if (from % aggBucketSize !== 0) {
    total -= size.slice(fromAgg * aggBucketSize, from).reduce(sumFn, 0);
  }
  if (to % aggBucketSize !== 0 && to !== lastTo) {
    total -= size.slice(to, toAgg * aggBucketSize).reduce(sumFn, 0);
  }

  return total
}

const commonVirtScrollProps = {
  virtualScrollSliceSize: {
    type: [ Number, String ],
    default: 10
  },

  virtualScrollSliceRatioBefore: {
    type: [ Number, String ],
    default: 1
  },

  virtualScrollSliceRatioAfter: {
    type: [ Number, String ],
    default: 1
  },

  virtualScrollItemSize: {
    type: [ Number, String ],
    default: 24
  },

  virtualScrollStickySizeStart: {
    type: [ Number, String ],
    default: 0
  },

  virtualScrollStickySizeEnd: {
    type: [ Number, String ],
    default: 0
  },

  tableColspan: [ Number, String ]
};

const useVirtualScrollProps = {
  virtualScrollHorizontal: Boolean,
  onVirtualScroll: Function,
  ...commonVirtScrollProps
};

function useVirtualScroll ({
  virtualScrollLength, getVirtualScrollTarget, getVirtualScrollEl,
  virtualScrollItemSizeComputed // optional
}) {
  const vm = getCurrentInstance();

  const { props, emit, proxy } = vm;
  const { $q } = proxy;

  let prevScrollStart, prevToIndex, localScrollViewSize, virtualScrollSizesAgg = [], virtualScrollSizes;

  const virtualScrollPaddingBefore = ref(0);
  const virtualScrollPaddingAfter = ref(0);
  const virtualScrollSliceSizeComputed = ref({});

  const beforeRef = ref(null);
  const afterRef = ref(null);
  const contentRef = ref(null);

  const virtualScrollSliceRange = ref({ from: 0, to: 0 });

  const colspanAttr = computed(() => (props.tableColspan !== void 0 ? props.tableColspan : 100));

  if (virtualScrollItemSizeComputed === void 0) {
    virtualScrollItemSizeComputed = computed(() => props.virtualScrollItemSize);
  }

  const needsReset = computed(() => virtualScrollItemSizeComputed.value + ';' + props.virtualScrollHorizontal);

  const needsSliceRecalc = computed(() =>
    needsReset.value + ';' + props.virtualScrollSliceRatioBefore + ';' + props.virtualScrollSliceRatioAfter
  );

  watch(needsSliceRecalc, () => { setVirtualScrollSize(); });
  watch(needsReset, reset);

  function reset () {
    localResetVirtualScroll(prevToIndex, true);
  }

  function refresh (toIndex) {
    localResetVirtualScroll(toIndex === void 0 ? prevToIndex : toIndex);
  }

  function scrollTo (toIndex, edge) {
    const scrollEl = getVirtualScrollTarget();

    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return
    }

    const scrollDetails = getScrollDetails(
      scrollEl,
      getVirtualScrollEl(),
      beforeRef.value,
      afterRef.value,
      props.virtualScrollHorizontal,
      $q.lang.rtl,
      props.virtualScrollStickySizeStart,
      props.virtualScrollStickySizeEnd
    );

    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);

    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      Math.min(virtualScrollLength.value - 1, Math.max(0, parseInt(toIndex, 10) || 0)),
      0,
      scrollToEdges.indexOf(edge) !== -1 ? edge : (prevToIndex !== -1 && toIndex > prevToIndex ? 'end' : 'start')
    );
  }

  function localOnVirtualScrollEvt () {
    const scrollEl = getVirtualScrollTarget();

    if (scrollEl === void 0 || scrollEl === null || scrollEl.nodeType === 8) {
      return
    }

    const
      scrollDetails = getScrollDetails(
        scrollEl,
        getVirtualScrollEl(),
        beforeRef.value,
        afterRef.value,
        props.virtualScrollHorizontal,
        $q.lang.rtl,
        props.virtualScrollStickySizeStart,
        props.virtualScrollStickySizeEnd
      ),
      listLastIndex = virtualScrollLength.value - 1,
      listEndOffset = scrollDetails.scrollMaxSize - scrollDetails.offsetStart - scrollDetails.offsetEnd - virtualScrollPaddingAfter.value;

    if (prevScrollStart === scrollDetails.scrollStart) {
      return
    }

    if (scrollDetails.scrollMaxSize <= 0) {
      setVirtualScrollSliceRange(scrollEl, scrollDetails, 0, 0);
      return
    }

    localScrollViewSize !== scrollDetails.scrollViewSize && setVirtualScrollSize(scrollDetails.scrollViewSize);

    updateVirtualScrollSizes(virtualScrollSliceRange.value.from);

    const scrollMaxStart = Math.floor(scrollDetails.scrollMaxSize
      - Math.max(scrollDetails.scrollViewSize, scrollDetails.offsetEnd)
      - Math.min(virtualScrollSizes[ listLastIndex ], scrollDetails.scrollViewSize / 2));

    if (scrollMaxStart > 0 && Math.ceil(scrollDetails.scrollStart) >= scrollMaxStart) {
      setVirtualScrollSliceRange(
        scrollEl,
        scrollDetails,
        listLastIndex,
        scrollDetails.scrollMaxSize - scrollDetails.offsetEnd - virtualScrollSizesAgg.reduce(sumFn, 0)
      );

      return
    }

    let
      toIndex = 0,
      listOffset = scrollDetails.scrollStart - scrollDetails.offsetStart,
      offset = listOffset;

    if (listOffset <= listEndOffset && listOffset + scrollDetails.scrollViewSize >= virtualScrollPaddingBefore.value) {
      listOffset -= virtualScrollPaddingBefore.value;
      toIndex = virtualScrollSliceRange.value.from;
      offset = listOffset;
    }
    else {
      for (let j = 0; listOffset >= virtualScrollSizesAgg[ j ] && toIndex < listLastIndex; j++) {
        listOffset -= virtualScrollSizesAgg[ j ];
        toIndex += aggBucketSize;
      }
    }

    while (listOffset > 0 && toIndex < listLastIndex) {
      listOffset -= virtualScrollSizes[ toIndex ];
      if (listOffset > -scrollDetails.scrollViewSize) {
        toIndex++;
        offset = listOffset;
      }
      else {
        offset = virtualScrollSizes[ toIndex ] + listOffset;
      }
    }

    setVirtualScrollSliceRange(
      scrollEl,
      scrollDetails,
      toIndex,
      offset
    );
  }

  function setVirtualScrollSliceRange (scrollEl, scrollDetails, toIndex, offset, align) {
    const alignForce = typeof align === 'string' && align.indexOf('-force') !== -1;
    const alignEnd = alignForce === true ? align.replace('-force', '') : align;
    const alignRange = alignEnd !== void 0 ? alignEnd : 'start';

    let
      from = Math.max(0, toIndex - virtualScrollSliceSizeComputed.value[ alignRange ]),
      to = from + virtualScrollSliceSizeComputed.value.total;

    if (to > virtualScrollLength.value) {
      to = virtualScrollLength.value;
      from = Math.max(0, to - virtualScrollSliceSizeComputed.value.total);
    }

    prevScrollStart = scrollDetails.scrollStart;

    const rangeChanged = from !== virtualScrollSliceRange.value.from || to !== virtualScrollSliceRange.value.to;

    if (rangeChanged === false && alignEnd === void 0) {
      emitScroll(toIndex);
      return
    }

    const { activeElement } = document;
    const contentEl = contentRef.value;
    if (
      rangeChanged === true
      && contentEl !== null
      && contentEl !== activeElement
      && contentEl.contains(activeElement) === true
    ) {
      contentEl.addEventListener('focusout', onBlurRefocusFn);

      setTimeout(() => {
        contentEl !== null && contentEl.removeEventListener('focusout', onBlurRefocusFn);
      });
    }

    const sizeBefore = alignEnd !== void 0 ? virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0) : 0;

    if (rangeChanged === true) {
      // vue key matching algorithm works only if
      // the array of VNodes changes on only one of the ends
      // so we first change one end and then the other

      const tempTo = to >= virtualScrollSliceRange.value.from && from <= virtualScrollSliceRange.value.to
        ? virtualScrollSliceRange.value.to
        : to;

      virtualScrollSliceRange.value = { from, to: tempTo };
      virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, from);
      virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);

      requestAnimationFrame(() => {
        if (virtualScrollSliceRange.value.to !== to && prevScrollStart === scrollDetails.scrollStart) {
          virtualScrollSliceRange.value = { from: virtualScrollSliceRange.value.from, to };
          virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, to, virtualScrollLength.value);
        }
      });
    }

    requestAnimationFrame(() => {
      // if the scroll was changed give up
      // (another call to setVirtualScrollSliceRange before animation frame)
      if (prevScrollStart !== scrollDetails.scrollStart) {
        return
      }

      if (rangeChanged === true) {
        updateVirtualScrollSizes(from);
      }

      const
        sizeAfter = virtualScrollSizes.slice(from, toIndex).reduce(sumFn, 0),
        posStart = sizeAfter + scrollDetails.offsetStart + virtualScrollPaddingBefore.value,
        posEnd = posStart + virtualScrollSizes[ toIndex ];

      let scrollPosition = posStart + offset;

      if (alignEnd !== void 0) {
        const sizeDiff = sizeAfter - sizeBefore;
        const scrollStart = scrollDetails.scrollStart + sizeDiff;

        scrollPosition = alignForce !== true && scrollStart < posStart && posEnd < scrollStart + scrollDetails.scrollViewSize
          ? scrollStart
          : (
              alignEnd === 'end'
                ? posEnd - scrollDetails.scrollViewSize
                : posStart - (alignEnd === 'start' ? 0 : Math.round((scrollDetails.scrollViewSize - virtualScrollSizes[ toIndex ]) / 2))
            );
      }

      prevScrollStart = scrollPosition;

      setScroll(
        scrollEl,
        scrollPosition,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );

      emitScroll(toIndex);
    });
  }

  function updateVirtualScrollSizes (from) {
    const contentEl = contentRef.value;

    if (contentEl) {
      const
        children = filterProto.call(
          contentEl.children,
          el => el.classList && el.classList.contains('q-virtual-scroll--skip') === false
        ),
        childrenLength = children.length,
        sizeFn = props.virtualScrollHorizontal === true
          ? el => el.getBoundingClientRect().width
          : el => el.offsetHeight;

      let
        index = from,
        size, diff;

      for (let i = 0; i < childrenLength;) {
        size = sizeFn(children[ i ]);
        i++;

        while (i < childrenLength && children[ i ].classList.contains('q-virtual-scroll--with-prev') === true) {
          size += sizeFn(children[ i ]);
          i++;
        }

        diff = size - virtualScrollSizes[ index ];

        if (diff !== 0) {
          virtualScrollSizes[ index ] += diff;
          virtualScrollSizesAgg[ Math.floor(index / aggBucketSize) ] += diff;
        }

        index++;
      }
    }
  }

  function onBlurRefocusFn () {
    contentRef.value !== null && contentRef.value !== void 0 && contentRef.value.focus();
  }

  function localResetVirtualScroll (toIndex, fullReset) {
    const defaultSize = 1 * virtualScrollItemSizeComputed.value;

    if (fullReset === true || Array.isArray(virtualScrollSizes) === false) {
      virtualScrollSizes = [];
    }

    const oldVirtualScrollSizesLength = virtualScrollSizes.length;

    virtualScrollSizes.length = virtualScrollLength.value;

    for (let i = virtualScrollLength.value - 1; i >= oldVirtualScrollSizesLength; i--) {
      virtualScrollSizes[ i ] = defaultSize;
    }

    const jMax = Math.floor((virtualScrollLength.value - 1) / aggBucketSize);
    virtualScrollSizesAgg = [];
    for (let j = 0; j <= jMax; j++) {
      let size = 0;
      const iMax = Math.min((j + 1) * aggBucketSize, virtualScrollLength.value);
      for (let i = j * aggBucketSize; i < iMax; i++) {
        size += virtualScrollSizes[ i ];
      }
      virtualScrollSizesAgg.push(size);
    }

    prevToIndex = -1;
    prevScrollStart = void 0;

    virtualScrollPaddingBefore.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, 0, virtualScrollSliceRange.value.from);
    virtualScrollPaddingAfter.value = sumSize(virtualScrollSizesAgg, virtualScrollSizes, virtualScrollSliceRange.value.to, virtualScrollLength.value);

    if (toIndex >= 0) {
      updateVirtualScrollSizes(virtualScrollSliceRange.value.from);
      nextTick(() => { scrollTo(toIndex); });
    }
    else {
      onVirtualScrollEvt();
    }
  }

  function setVirtualScrollSize (scrollViewSize) {
    if (scrollViewSize === void 0 && "undefined" !== 'undefined') {
      const scrollEl = getVirtualScrollTarget();

      if (scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
        scrollViewSize = getScrollDetails(
          scrollEl,
          getVirtualScrollEl(),
          beforeRef.value,
          afterRef.value,
          props.virtualScrollHorizontal,
          $q.lang.rtl,
          props.virtualScrollStickySizeStart,
          props.virtualScrollStickySizeEnd
        ).scrollViewSize;
      }
    }

    localScrollViewSize = scrollViewSize;

    const virtualScrollSliceRatioBefore = parseFloat(props.virtualScrollSliceRatioBefore) || 0;
    const virtualScrollSliceRatioAfter = parseFloat(props.virtualScrollSliceRatioAfter) || 0;
    const multiplier = 1 + virtualScrollSliceRatioBefore + virtualScrollSliceRatioAfter;
    const view = scrollViewSize === void 0 || scrollViewSize <= 0
      ? 1
      : Math.ceil(scrollViewSize / virtualScrollItemSizeComputed.value);

    const baseSize = Math.max(
      1,
      view,
      Math.ceil((props.virtualScrollSliceSize > 0 ? props.virtualScrollSliceSize : 10) / multiplier)
    );

    virtualScrollSliceSizeComputed.value = {
      total: Math.ceil(baseSize * multiplier),
      start: Math.ceil(baseSize * virtualScrollSliceRatioBefore),
      center: Math.ceil(baseSize * (0.5 + virtualScrollSliceRatioBefore)),
      end: Math.ceil(baseSize * (1 + virtualScrollSliceRatioBefore)),
      view
    };
  }

  function padVirtualScroll (tag, content) {
    const paddingSize = props.virtualScrollHorizontal === true ? 'width' : 'height';
    const style = {
      [ '--q-virtual-scroll-item-' + paddingSize ]: virtualScrollItemSizeComputed.value + 'px'
    };

    return [
      tag === 'tbody'
        ? h(tag, {
          class: 'q-virtual-scroll__padding',
          key: 'before',
          ref: beforeRef
        }, [
          h('tr', [
            h('td', {
              style: { [ paddingSize ]: `${ virtualScrollPaddingBefore.value }px`, ...style },
              colspan: colspanAttr.value
            })
          ])
        ])
        : h(tag, {
          class: 'q-virtual-scroll__padding',
          key: 'before',
          ref: beforeRef,
          style: { [ paddingSize ]: `${ virtualScrollPaddingBefore.value }px`, ...style }
        }),

      h(tag, {
        class: 'q-virtual-scroll__content',
        key: 'content',
        ref: contentRef,
        tabindex: -1
      }, content.flat()),

      tag === 'tbody'
        ? h(tag, {
          class: 'q-virtual-scroll__padding',
          key: 'after',
          ref: afterRef
        }, [
          h('tr', [
            h('td', {
              style: { [ paddingSize ]: `${ virtualScrollPaddingAfter.value }px`, ...style },
              colspan: colspanAttr.value
            })
          ])
        ])
        : h(tag, {
          class: 'q-virtual-scroll__padding',
          key: 'after',
          ref: afterRef,
          style: { [ paddingSize ]: `${ virtualScrollPaddingAfter.value }px`, ...style }
        })
    ]
  }

  function emitScroll (index) {
    if (prevToIndex !== index) {
      props.onVirtualScroll !== void 0 && emit('virtualScroll', {
        index,
        from: virtualScrollSliceRange.value.from,
        to: virtualScrollSliceRange.value.to - 1,
        direction: index < prevToIndex ? 'decrease' : 'increase',
        ref: proxy
      });

      prevToIndex = index;
    }
  }

  setVirtualScrollSize();
  const onVirtualScrollEvt = debounce(
    localOnVirtualScrollEvt,
    $q.platform.is.ios === true ? 120 : 35
  );

  onBeforeMount(() => {
    setVirtualScrollSize();
  });

  let shouldActivate = false;

  onDeactivated(() => {
    shouldActivate = true;
  });

  onActivated(() => {
    if (shouldActivate !== true) return

    const scrollEl = getVirtualScrollTarget();

    if (prevScrollStart !== void 0 && scrollEl !== void 0 && scrollEl !== null && scrollEl.nodeType !== 8) {
      setScroll(
        scrollEl,
        prevScrollStart,
        props.virtualScrollHorizontal,
        $q.lang.rtl
      );
    }
    else {
      scrollTo(prevToIndex);
    }
  });

  // expose public methods
  Object.assign(proxy, { scrollTo, reset, refresh });

  return {
    virtualScrollSliceRange,
    virtualScrollSliceSizeComputed,

    setVirtualScrollSize,
    onVirtualScrollEvt,
    localResetVirtualScroll,
    padVirtualScroll,

    scrollTo,
    reset,
    refresh
  }
}

function normalizeToInterval (v, min, max) {
  if (max <= min) {
    return min
  }

  const size = (max - min + 1);

  let index = min + (v - min) % size;
  if (index < min) {
    index = size + index;
  }

  return index === 0 ? 0 : index // fix for (-a % a) => -0
}

const validateNewValueMode = v => [ 'add', 'add-unique', 'toggle' ].includes(v);
const reEscapeList = '.*+?^${}()|[]\\';
const fieldPropsList = Object.keys(useFieldProps);

function getPropValueFn (userPropName, defaultPropName) {
  if (typeof userPropName === 'function') return userPropName

  const propName = userPropName !== void 0
    ? userPropName
    : defaultPropName;

  return opt => ((opt !== null && typeof opt === 'object' && propName in opt) ? opt[ propName ] : opt)
}

const __nuxt_component_0 = createComponent({
  name: 'QSelect',

  inheritAttrs: false,

  props: {
    ...useVirtualScrollProps,
    ...useFormProps,
    ...useFieldProps,

    // override of useFieldProps > modelValue
    modelValue: {
      required: true
    },

    multiple: Boolean,

    displayValue: [ String, Number ],
    displayValueHtml: Boolean,
    dropdownIcon: String,

    options: {
      type: Array,
      default: () => []
    },

    optionValue: [ Function, String ],
    optionLabel: [ Function, String ],
    optionDisable: [ Function, String ],

    hideSelected: Boolean,
    hideDropdownIcon: Boolean,
    fillInput: Boolean,

    maxValues: [ Number, String ],

    optionsDense: Boolean,
    optionsDark: {
      type: Boolean,
      default: null
    },
    optionsSelectedClass: String,
    optionsHtml: Boolean,

    optionsCover: Boolean,

    menuShrink: Boolean,
    menuAnchor: String,
    menuSelf: String,
    menuOffset: Array,

    popupContentClass: String,
    popupContentStyle: [ String, Array, Object ],
    popupNoRouteDismiss: Boolean,

    useInput: Boolean,
    useChips: Boolean,

    newValueMode: {
      type: String,
      validator: validateNewValueMode
    },

    mapOptions: Boolean,
    emitValue: Boolean,

    disableTabSelection: Boolean,

    inputDebounce: {
      type: [ Number, String ],
      default: 500
    },

    inputClass: [ Array, String, Object ],
    inputStyle: [ Array, String, Object ],

    tabindex: {
      type: [ String, Number ],
      default: 0
    },

    autocomplete: String,

    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},

    behavior: {
      type: String,
      validator: v => [ 'default', 'menu', 'dialog' ].includes(v),
      default: 'default'
    },

    // override of useVirtualScrollProps > virtualScrollItemSize (no default)
    virtualScrollItemSize: useVirtualScrollProps.virtualScrollItemSize.type,

    onNewValue: Function,
    onFilter: Function
  },

  emits: [
    ...useFieldEmits,
    'add', 'remove', 'inputValue',
    'keyup', 'keypress', 'keydown',
    'popupShow', 'popupHide',
    'filterAbort'
  ],

  setup (props, { slots, emit }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const menu = ref(false);
    const dialog = ref(false);
    const optionIndex = ref(-1);
    const inputValue = ref('');
    const dialogFieldFocused = ref(false);
    const innerLoadingIndicator = ref(false);

    let filterTimer = null, inputValueTimer = null,
      innerValueCache,
      hasDialog, userInputValue, filterId = null, defaultInputValue,
      transitionShowComputed, searchBuffer, searchBufferExp;

    const inputRef = ref(null);
    const targetRef = ref(null);
    const menuRef = ref(null);
    const dialogRef = ref(null);
    const menuContentRef = ref(null);

    const nameProp = useFormInputNameAttr(props);

    const onComposition = useKeyComposition(onInput);

    const virtualScrollLength = computed(() => props.options.length);
    const virtualScrollItemSizeComputed = computed(() => (
      props.virtualScrollItemSize === void 0
        ? (props.optionsDense === true ? 24 : 48)
        : props.virtualScrollItemSize
    ));

    const {
      virtualScrollSliceRange,
      virtualScrollSliceSizeComputed,
      localResetVirtualScroll,
      padVirtualScroll,
      onVirtualScrollEvt,
      scrollTo,
      setVirtualScrollSize
    } = useVirtualScroll({
      virtualScrollLength, getVirtualScrollTarget, getVirtualScrollEl,
      virtualScrollItemSizeComputed
    });

    const state = useFieldState();

    const innerValue = computed(() => {
      const
        mapNull = props.mapOptions === true && props.multiple !== true,
        val = props.modelValue !== void 0 && (props.modelValue !== null || mapNull === true)
          ? (props.multiple === true && Array.isArray(props.modelValue) ? props.modelValue : [ props.modelValue ])
          : [];

      if (props.mapOptions === true) {
        const cache = props.mapOptions === true && innerValueCache !== void 0
          ? innerValueCache
          : [];
        const values = val.map(v => getOption(v, cache));

        return props.modelValue === null && mapNull === true
          ? values.filter(v => v !== null)
          : values
      }

      return val
    });

    const innerFieldProps = computed(() => {
      const acc = {};
      fieldPropsList.forEach(key => {
        const val = props[ key ];
        if (val !== void 0) {
          acc[ key ] = val;
        }
      });
      return acc
    });

    const isOptionsDark = computed(() => (
      props.optionsDark === null
        ? state.isDark.value
        : props.optionsDark
    ));

    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));

    const computedInputClass = computed(() => {
      let cls = 'q-field__input q-placeholder col';

      if (props.hideSelected === true || innerValue.value.length === 0) {
        return [ cls, props.inputClass ]
      }

      cls += ' q-field__input--padding';

      return props.inputClass === void 0
        ? cls
        : [ cls, props.inputClass ]
    });

    const menuContentClass = computed(() =>
      (props.virtualScrollHorizontal === true ? 'q-virtual-scroll--horizontal' : '')
      + (props.popupContentClass ? ' ' + props.popupContentClass : '')
    );

    const noOptions = computed(() => virtualScrollLength.value === 0);

    const selectedString = computed(() =>
      innerValue.value
        .map(opt => getOptionLabel.value(opt))
        .join(', ')
    );

    const ariaCurrentValue = computed(() => (props.displayValue !== void 0
      ? props.displayValue
      : selectedString.value
    ));

    const needsHtmlFn = computed(() => (
      props.optionsHtml === true
        ? () => true
        : opt => opt !== void 0 && opt !== null && opt.html === true
    ));

    const valueAsHtml = computed(() => (
      props.displayValueHtml === true || (
        props.displayValue === void 0 && (
          props.optionsHtml === true
          || innerValue.value.some(needsHtmlFn.value)
        )
      )
    ));

    const tabindex = computed(() => (state.focused.value === true ? props.tabindex : -1));

    const comboboxAttrs = computed(() => {
      const attrs = {
        tabindex: props.tabindex,
        role: 'combobox',
        'aria-label': props.label,
        'aria-readonly': props.readonly === true ? 'true' : 'false',
        'aria-autocomplete': props.useInput === true ? 'list' : 'none',
        'aria-expanded': menu.value === true ? 'true' : 'false',
        'aria-controls': `${ state.targetUid.value }_lb`
      };

      if (optionIndex.value >= 0) {
        attrs[ 'aria-activedescendant' ] = `${ state.targetUid.value }_${ optionIndex.value }`;
      }

      return attrs
    });

    const listboxAttrs = computed(() => ({
      id: `${ state.targetUid.value }_lb`,
      role: 'listbox',
      'aria-multiselectable': props.multiple === true ? 'true' : 'false'
    }));

    const selectedScope = computed(() => {
      return innerValue.value.map((opt, i) => ({
        index: i,
        opt,
        html: needsHtmlFn.value(opt),
        selected: true,
        removeAtIndex: removeAtIndexAndFocus,
        toggleOption,
        tabindex: tabindex.value
      }))
    });

    const optionScope = computed(() => {
      if (virtualScrollLength.value === 0) {
        return []
      }

      const { from, to } = virtualScrollSliceRange.value;

      return props.options.slice(from, to).map((opt, i) => {
        const disable = isOptionDisabled.value(opt) === true;
        const active = isOptionSelected(opt) === true;
        const index = from + i;

        const itemProps = {
          clickable: true,
          active,
          activeClass: computedOptionsSelectedClass.value,
          manualFocus: true,
          focused: false,
          disable,
          tabindex: -1,
          dense: props.optionsDense,
          dark: isOptionsDark.value,
          role: 'option',
          'aria-selected': active === true ? 'true' : 'false',
          id: `${ state.targetUid.value }_${ index }`,
          onClick: () => { toggleOption(opt); }
        };

        if (disable !== true) {
          optionIndex.value === index && (itemProps.focused = true);

          if ($q.platform.is.desktop === true) {
            itemProps.onMousemove = () => { menu.value === true && setOptionIndex(index); };
          }
        }

        return {
          index,
          opt,
          html: needsHtmlFn.value(opt),
          label: getOptionLabel.value(opt),
          selected: itemProps.active,
          focused: itemProps.focused,
          toggleOption,
          setOptionIndex,
          itemProps
        }
      })
    });

    const dropdownArrowIcon = computed(() => (
      props.dropdownIcon !== void 0
        ? props.dropdownIcon
        : $q.iconSet.arrow.dropdown
    ));

    const squaredMenu = computed(() =>
      props.optionsCover === false
      && props.outlined !== true
      && props.standout !== true
      && props.borderless !== true
      && props.rounded !== true
    );

    const computedOptionsSelectedClass = computed(() => (
      props.optionsSelectedClass !== void 0
        ? props.optionsSelectedClass
        : (props.color !== void 0 ? `text-${ props.color }` : '')
    ));

    // returns method to get value of an option;
    // takes into account 'option-value' prop
    const getOptionValue = computed(() => getPropValueFn(props.optionValue, 'value'));

    // returns method to get label of an option;
    // takes into account 'option-label' prop
    const getOptionLabel = computed(() => getPropValueFn(props.optionLabel, 'label'));

    // returns method to tell if an option is disabled;
    // takes into account 'option-disable' prop
    const isOptionDisabled = computed(() => getPropValueFn(props.optionDisable, 'disable'));

    const innerOptionsValue = computed(() => innerValue.value.map(getOptionValue.value));

    const inputControlEvents = computed(() => {
      const evt = {
        onInput,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange: onComposition,
        onKeydown: onTargetKeydown,
        onKeyup: onTargetAutocomplete,
        onKeypress: onTargetKeypress,
        onFocus: selectInputText,
        onClick (e) { hasDialog === true && stop(e); }
      };

      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;

      return evt
    });

    watch(innerValue, val => {
      innerValueCache = val;

      if (
        props.useInput === true
        && props.fillInput === true
        && props.multiple !== true
        // Prevent re-entering in filter while filtering
        // Also prevent clearing inputValue while filtering
        && state.innerLoading.value !== true
        && ((dialog.value !== true && menu.value !== true) || hasValue.value !== true)
      ) {
        userInputValue !== true && resetInputValue();
        if (dialog.value === true || menu.value === true) {
          filter('');
        }
      }
    }, { immediate: true });

    watch(() => props.fillInput, resetInputValue);

    watch(menu, updateMenu);

    watch(virtualScrollLength, rerenderMenu);

    function getEmittingOptionValue (opt) {
      return props.emitValue === true
        ? getOptionValue.value(opt)
        : opt
    }

    function removeAtIndex (index) {
      if (index !== -1 && index < innerValue.value.length) {
        if (props.multiple === true) {
          const model = props.modelValue.slice();
          emit('remove', { index, value: model.splice(index, 1)[ 0 ] });
          emit('update:modelValue', model);
        }
        else {
          emit('update:modelValue', null);
        }
      }
    }

    function removeAtIndexAndFocus (index) {
      removeAtIndex(index);
      state.focus();
    }

    function add (opt, unique) {
      const val = getEmittingOptionValue(opt);

      if (props.multiple !== true) {
        props.fillInput === true && updateInputValue(
          getOptionLabel.value(opt),
          true,
          true
        );

        emit('update:modelValue', val);
        return
      }

      if (innerValue.value.length === 0) {
        emit('add', { index: 0, value: val });
        emit('update:modelValue', props.multiple === true ? [ val ] : val);
        return
      }

      if (unique === true && isOptionSelected(opt) === true) {
        return
      }

      if (props.maxValues !== void 0 && props.modelValue.length >= props.maxValues) {
        return
      }

      const model = props.modelValue.slice();

      emit('add', { index: model.length, value: val });
      model.push(val);
      emit('update:modelValue', model);
    }

    function toggleOption (opt, keepOpen) {
      if (state.editable.value !== true || opt === void 0 || isOptionDisabled.value(opt) === true) {
        return
      }

      const optValue = getOptionValue.value(opt);

      if (props.multiple !== true) {
        if (keepOpen !== true) {
          updateInputValue(
            props.fillInput === true ? getOptionLabel.value(opt) : '',
            true,
            true
          );

          hidePopup();
        }

        targetRef.value !== null && targetRef.value.focus();

        if (
          innerValue.value.length === 0
          || isDeepEqual(getOptionValue.value(innerValue.value[ 0 ]), optValue) !== true
        ) {
          emit('update:modelValue', props.emitValue === true ? optValue : opt);
        }
        return
      }

      (hasDialog !== true || dialogFieldFocused.value === true) && state.focus();

      selectInputText();

      if (innerValue.value.length === 0) {
        const val = props.emitValue === true ? optValue : opt;
        emit('add', { index: 0, value: val });
        emit('update:modelValue', props.multiple === true ? [ val ] : val);
        return
      }

      const
        model = props.modelValue.slice(),
        index = innerOptionsValue.value.findIndex(v => isDeepEqual(v, optValue));

      if (index !== -1) {
        emit('remove', { index, value: model.splice(index, 1)[ 0 ] });
      }
      else {
        if (props.maxValues !== void 0 && model.length >= props.maxValues) {
          return
        }

        const val = props.emitValue === true ? optValue : opt;

        emit('add', { index: model.length, value: val });
        model.push(val);
      }

      emit('update:modelValue', model);
    }

    function setOptionIndex (index) {
      if ($q.platform.is.desktop !== true) return

      const val = index !== -1 && index < virtualScrollLength.value
        ? index
        : -1;

      if (optionIndex.value !== val) {
        optionIndex.value = val;
      }
    }

    function moveOptionSelection (offset = 1, skipInputValue) {
      if (menu.value === true) {
        let index = optionIndex.value;
        do {
          index = normalizeToInterval(
            index + offset,
            -1,
            virtualScrollLength.value - 1
          );
        }
        while (index !== -1 && index !== optionIndex.value && isOptionDisabled.value(props.options[ index ]) === true)

        if (optionIndex.value !== index) {
          setOptionIndex(index);
          scrollTo(index);

          if (skipInputValue !== true && props.useInput === true && props.fillInput === true) {
            setInputValue(
              index >= 0
                ? getOptionLabel.value(props.options[ index ])
                : defaultInputValue,
              true
            );
          }
        }
      }
    }

    function getOption (value, valueCache) {
      const fn = opt => isDeepEqual(getOptionValue.value(opt), value);
      return props.options.find(fn) || valueCache.find(fn) || value
    }

    function isOptionSelected (opt) {
      const val = getOptionValue.value(opt);
      return innerOptionsValue.value.find(v => isDeepEqual(v, val)) !== void 0
    }

    function selectInputText (e) {
      if (
        props.useInput === true
        && targetRef.value !== null
        && (e === void 0 || (targetRef.value === e.target && e.target.value === selectedString.value))
      ) {
        targetRef.value.select();
      }
    }

    function onTargetKeyup (e) {
      // if ESC and we have an opened menu
      // then stop propagation (might be caught by a QDialog
      // and so it will also close the QDialog, which is wrong)
      if (isKeyCode(e, 27) === true && menu.value === true) {
        stop(e);
        // on ESC we need to close the dialog also
        hidePopup();
        resetInputValue();
      }

      emit('keyup', e);
    }

    function onTargetAutocomplete (e) {
      const { value } = e.target;

      if (e.keyCode !== void 0) {
        onTargetKeyup(e);
        return
      }

      e.target.value = '';

      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }

      resetInputValue();

      if (typeof value === 'string' && value.length !== 0) {
        const needle = value.toLocaleLowerCase();
        const findFn = extractFn => {
          const option = props.options.find(opt => extractFn.value(opt).toLocaleLowerCase() === needle);

          if (option === void 0) {
            return false
          }

          if (innerValue.value.indexOf(option) === -1) {
            toggleOption(option);
          }
          else {
            hidePopup();
          }

          return true
        };
        const fillFn = afterFilter => {
          if (findFn(getOptionValue) === true) {
            return
          }
          if (findFn(getOptionLabel) === true || afterFilter === true) {
            return
          }

          filter(value, true, () => fillFn(true));
        };

        fillFn();
      }
      else {
        state.clearValue(e);
      }
    }

    function onTargetKeypress (e) {
      emit('keypress', e);
    }

    function onTargetKeydown (e) {
      emit('keydown', e);

      if (shouldIgnoreKey(e) === true) {
        return
      }

      const newValueModeValid = inputValue.value.length !== 0
        && (props.newValueMode !== void 0 || props.onNewValue !== void 0);

      const tabShouldSelect = e.shiftKey !== true
        && props.disableTabSelection !== true
        && props.multiple !== true
        && (optionIndex.value !== -1 || newValueModeValid === true);

      // escape
      if (e.keyCode === 27) {
        prevent(e); // prevent clearing the inputValue
        return
      }

      // tab
      if (e.keyCode === 9 && tabShouldSelect === false) {
        closeMenu();
        return
      }

      if (
        e.target === void 0
        || e.target.id !== state.targetUid.value
        || state.editable.value !== true
      ) return

      // down
      if (
        e.keyCode === 40
        && state.innerLoading.value !== true
        && menu.value === false
      ) {
        stopAndPrevent(e);
        showPopup();
        return
      }

      // backspace
      if (
        e.keyCode === 8
        && (
          props.useChips === true
          || props.clearable === true
        )
        && props.hideSelected !== true
        && inputValue.value.length === 0
      ) {
        if (props.multiple === true && Array.isArray(props.modelValue) === true) {
          removeAtIndex(props.modelValue.length - 1);
        }
        else if (props.multiple !== true && props.modelValue !== null) {
          emit('update:modelValue', null);
        }
        return
      }

      // home, end - 36, 35
      if (
        (e.keyCode === 35 || e.keyCode === 36)
        && (typeof inputValue.value !== 'string' || inputValue.value.length === 0)
      ) {
        stopAndPrevent(e);
        optionIndex.value = -1;
        moveOptionSelection(e.keyCode === 36 ? 1 : -1, props.multiple);
      }

      // pg up, pg down - 33, 34
      if (
        (e.keyCode === 33 || e.keyCode === 34)
        && virtualScrollSliceSizeComputed.value !== void 0
      ) {
        stopAndPrevent(e);
        optionIndex.value = Math.max(
          -1,
          Math.min(
            virtualScrollLength.value,
            optionIndex.value + (e.keyCode === 33 ? -1 : 1) * virtualScrollSliceSizeComputed.value.view
          )
        );
        moveOptionSelection(e.keyCode === 33 ? 1 : -1, props.multiple);
      }

      // up, down
      if (e.keyCode === 38 || e.keyCode === 40) {
        stopAndPrevent(e);
        moveOptionSelection(e.keyCode === 38 ? -1 : 1, props.multiple);
      }

      const optionsLength = virtualScrollLength.value;

      // clear search buffer if expired
      if (searchBuffer === void 0 || searchBufferExp < Date.now()) {
        searchBuffer = '';
      }

      // keyboard search when not having use-input
      if (
        optionsLength > 0
        && props.useInput !== true
        && e.key !== void 0
        && e.key.length === 1 // printable char
        && e.altKey === false // not kbd shortcut
        && e.ctrlKey === false // not kbd shortcut
        && e.metaKey === false // not kbd shortcut, especially on macOS with Command key
        && (e.keyCode !== 32 || searchBuffer.length !== 0) // space in middle of search
      ) {
        menu.value !== true && showPopup(e);

        const
          char = e.key.toLocaleLowerCase(),
          keyRepeat = searchBuffer.length === 1 && searchBuffer[ 0 ] === char;

        searchBufferExp = Date.now() + 1500;
        if (keyRepeat === false) {
          stopAndPrevent(e);
          searchBuffer += char;
        }

        const searchRe = new RegExp('^' + searchBuffer.split('').map(l => (reEscapeList.indexOf(l) !== -1 ? '\\' + l : l)).join('.*'), 'i');

        let index = optionIndex.value;

        if (keyRepeat === true || index < 0 || searchRe.test(getOptionLabel.value(props.options[ index ])) !== true) {
          do {
            index = normalizeToInterval(index + 1, -1, optionsLength - 1);
          }
          while (index !== optionIndex.value && (
            isOptionDisabled.value(props.options[ index ]) === true
            || searchRe.test(getOptionLabel.value(props.options[ index ])) !== true
          ))
        }

        if (optionIndex.value !== index) {
          nextTick(() => {
            setOptionIndex(index);
            scrollTo(index);

            if (index >= 0 && props.useInput === true && props.fillInput === true) {
              setInputValue(getOptionLabel.value(props.options[ index ]), true);
            }
          });
        }

        return
      }

      // enter, space (when not using use-input and not in search), or tab (when not using multiple and option selected)
      // same target is checked above
      if (
        e.keyCode !== 13
        && (e.keyCode !== 32 || props.useInput === true || searchBuffer !== '')
        && (e.keyCode !== 9 || tabShouldSelect === false)
      ) return

      e.keyCode !== 9 && stopAndPrevent(e);

      if (optionIndex.value !== -1 && optionIndex.value < optionsLength) {
        toggleOption(props.options[ optionIndex.value ]);
        return
      }

      if (newValueModeValid === true) {
        const done = (val, mode) => {
          if (mode) {
            if (validateNewValueMode(mode) !== true) {
              return
            }
          }
          else {
            mode = props.newValueMode;
          }

          updateInputValue('', props.multiple !== true, true);

          if (val === void 0 || val === null) {
            return
          }

          const fn = mode === 'toggle' ? toggleOption : add;
          fn(val, mode === 'add-unique');

          if (props.multiple !== true) {
            targetRef.value !== null && targetRef.value.focus();
            hidePopup();
          }
        };

        if (props.onNewValue !== void 0) {
          emit('newValue', inputValue.value, done);
        }
        else {
          done(inputValue.value);
        }

        if (props.multiple !== true) {
          return
        }
      }

      if (menu.value === true) {
        closeMenu();
      }
      else if (state.innerLoading.value !== true) {
        showPopup();
      }
    }

    function getVirtualScrollEl () {
      return hasDialog === true
        ? menuContentRef.value
        : (
            menuRef.value !== null && menuRef.value.contentEl !== null
              ? menuRef.value.contentEl
              : void 0
          )
    }

    function getVirtualScrollTarget () {
      return getVirtualScrollEl()
    }

    function getSelection () {
      if (props.hideSelected === true) {
        return []
      }

      if (slots[ 'selected-item' ] !== void 0) {
        return selectedScope.value.map(scope => slots[ 'selected-item' ](scope)).slice()
      }

      if (slots.selected !== void 0) {
        return [].concat(slots.selected())
      }

      if (props.useChips === true) {
        return selectedScope.value.map((scope, i) => h(QChip, {
          key: 'option-' + i,
          removable: state.editable.value === true && isOptionDisabled.value(scope.opt) !== true,
          dense: true,
          textColor: props.color,
          tabindex: tabindex.value,
          onRemove () { scope.removeAtIndex(i); }
        }, () => h('span', {
          class: 'ellipsis',
          [ scope.html === true ? 'innerHTML' : 'textContent' ]: getOptionLabel.value(scope.opt)
        })))
      }

      return [
        h('span', {
          [ valueAsHtml.value === true ? 'innerHTML' : 'textContent' ]: ariaCurrentValue.value
        })
      ]
    }

    function getAllOptions () {
      if (noOptions.value === true) {
        return slots[ 'no-option' ] !== void 0
          ? slots[ 'no-option' ]({ inputValue: inputValue.value })
          : void 0
      }

      const fn = slots.option !== void 0
        ? slots.option
        : scope => {
          return h(QItem, {
            key: scope.index,
            ...scope.itemProps
          }, () => {
            return h(
              QItemSection,
              () => h(
                QItemLabel,
                () => h('span', {
                  [ scope.html === true ? 'innerHTML' : 'textContent' ]: scope.label
                })
              )
            )
          })
        };

      let options = padVirtualScroll('div', optionScope.value.map(fn));

      if (slots[ 'before-options' ] !== void 0) {
        options = slots[ 'before-options' ]().concat(options);
      }

      return hMergeSlot(slots[ 'after-options' ], options)
    }

    function getInput (fromDialog, isTarget) {
      const attrs = isTarget === true ? { ...comboboxAttrs.value, ...state.splitAttrs.attributes.value } : void 0;

      const data = {
        ref: isTarget === true ? targetRef : void 0,
        key: 'i_t',
        class: computedInputClass.value,
        style: props.inputStyle,
        value: inputValue.value !== void 0 ? inputValue.value : '',
        // required for Android in order to show ENTER key when in form
        type: 'search',
        ...attrs,
        id: isTarget === true ? state.targetUid.value : void 0,
        maxlength: props.maxlength,
        autocomplete: props.autocomplete,
        'data-autofocus': fromDialog === true || props.autofocus === true || void 0,
        disabled: props.disable === true,
        readonly: props.readonly === true,
        ...inputControlEvents.value
      };

      if (fromDialog !== true && hasDialog === true) {
        if (Array.isArray(data.class) === true) {
          data.class = [ ...data.class, 'no-pointer-events' ];
        }
        else {
          data.class += ' no-pointer-events';
        }
      }

      return h('input', data)
    }

    function onInput (e) {
      if (filterTimer !== null) {
        clearTimeout(filterTimer);
        filterTimer = null;
      }
      if (inputValueTimer !== null) {
        clearTimeout(inputValueTimer);
        inputValueTimer = null;
      }

      if (e && e.target && e.target.qComposing === true) {
        return
      }

      setInputValue(e.target.value || '');
      // mark it here as user input so that if updateInputValue is called
      // before filter is called the indicator is reset
      userInputValue = true;
      defaultInputValue = inputValue.value;

      if (
        state.focused.value !== true
        && (hasDialog !== true || dialogFieldFocused.value === true)
      ) {
        state.focus();
      }

      if (props.onFilter !== void 0) {
        filterTimer = setTimeout(() => {
          filterTimer = null;
          filter(inputValue.value);
        }, props.inputDebounce);
      }
    }

    function setInputValue (val, emitImmediately) {
      if (inputValue.value !== val) {
        inputValue.value = val;

        if (emitImmediately === true || props.inputDebounce === 0 || props.inputDebounce === '0') {
          emit('inputValue', val);
        }
        else {
          inputValueTimer = setTimeout(() => {
            inputValueTimer = null;
            emit('inputValue', val);
          }, props.inputDebounce);
        }
      }
    }

    function updateInputValue (val, noFiltering, internal) {
      userInputValue = internal !== true;

      if (props.useInput === true) {
        setInputValue(val, true);

        if (noFiltering === true || internal !== true) {
          defaultInputValue = val;
        }

        noFiltering !== true && filter(val);
      }
    }

    function filter (val, keepClosed, afterUpdateFn) {
      if (props.onFilter === void 0 || (keepClosed !== true && state.focused.value !== true)) {
        return
      }

      if (state.innerLoading.value === true) {
        emit('filterAbort');
      }
      else {
        state.innerLoading.value = true;
        innerLoadingIndicator.value = true;
      }

      if (
        val !== ''
        && props.multiple !== true
        && innerValue.value.length !== 0
        && userInputValue !== true
        && val === getOptionLabel.value(innerValue.value[ 0 ])
      ) {
        val = '';
      }

      const localFilterId = setTimeout(() => {
        menu.value === true && (menu.value = false);
      }, 10);

      filterId !== null && clearTimeout(filterId);
      filterId = localFilterId;

      emit(
        'filter',
        val,
        (fn, afterFn) => {
          if ((keepClosed === true || state.focused.value === true) && filterId === localFilterId) {
            clearTimeout(filterId);

            typeof fn === 'function' && fn();

            // hide indicator to allow arrow to animate
            innerLoadingIndicator.value = false;

            nextTick(() => {
              state.innerLoading.value = false;

              if (state.editable.value === true) {
                if (keepClosed === true) {
                  menu.value === true && hidePopup();
                }
                else if (menu.value === true) {
                  updateMenu(true);
                }
                else {
                  menu.value = true;
                }
              }

              typeof afterFn === 'function' && nextTick(() => { afterFn(proxy); });
              typeof afterUpdateFn === 'function' && nextTick(() => { afterUpdateFn(proxy); });
            });
          }
        },
        () => {
          if (state.focused.value === true && filterId === localFilterId) {
            clearTimeout(filterId);
            state.innerLoading.value = false;
            innerLoadingIndicator.value = false;
          }
          menu.value === true && (menu.value = false);
        }
      );
    }

    function getMenu () {
      return h(QMenu, {
        ref: menuRef,
        class: menuContentClass.value,
        style: props.popupContentStyle,
        modelValue: menu.value,
        fit: props.menuShrink !== true,
        cover: props.optionsCover === true && noOptions.value !== true && props.useInput !== true,
        anchor: props.menuAnchor,
        self: props.menuSelf,
        offset: props.menuOffset,
        dark: isOptionsDark.value,
        noParentEvent: true,
        noRefocus: true,
        noFocus: true,
        noRouteDismiss: props.popupNoRouteDismiss,
        square: squaredMenu.value,
        transitionShow: props.transitionShow,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        separateClosePopup: true,
        ...listboxAttrs.value,
        onScrollPassive: onVirtualScrollEvt,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onMenuBeforeHide,
        onShow: onMenuShow
      }, getAllOptions)
    }

    function onMenuBeforeHide (e) {
      onControlPopupHide(e);
      closeMenu();
    }

    function onMenuShow () {
      setVirtualScrollSize();
    }

    function onDialogFieldFocus (e) {
      stop(e);
      targetRef.value !== null && targetRef.value.focus();
      dialogFieldFocused.value = true;
      window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, 0);
    }

    function onDialogFieldBlur (e) {
      stop(e);
      nextTick(() => {
        dialogFieldFocused.value = false;
      });
    }

    function getDialog () {
      const content = [
        h(QField, {
          class: `col-auto ${ state.fieldClass.value }`,
          ...innerFieldProps.value,
          for: state.targetUid.value,
          dark: isOptionsDark.value,
          square: true,
          loading: innerLoadingIndicator.value,
          itemAligned: false,
          filled: true,
          stackLabel: inputValue.value.length !== 0,
          ...state.splitAttrs.listeners.value,
          onFocus: onDialogFieldFocus,
          onBlur: onDialogFieldBlur
        }, {
          ...slots,
          rawControl: () => state.getControl(true),
          before: void 0,
          after: void 0
        })
      ];

      menu.value === true && content.push(
        h('div', {
          ref: menuContentRef,
          class: menuContentClass.value + ' scroll',
          style: props.popupContentStyle,
          ...listboxAttrs.value,
          onClick: prevent,
          onScrollPassive: onVirtualScrollEvt
        }, getAllOptions())
      );

      return h(__nuxt_component_0$1, {
        ref: dialogRef,
        modelValue: dialog.value,
        position: props.useInput === true ? 'top' : void 0,
        transitionShow: transitionShowComputed,
        transitionHide: props.transitionHide,
        transitionDuration: props.transitionDuration,
        noRouteDismiss: props.popupNoRouteDismiss,
        onBeforeShow: onControlPopupShow,
        onBeforeHide: onDialogBeforeHide,
        onHide: onDialogHide,
        onShow: onDialogShow
      }, () => h('div', {
        class: 'q-select__dialog'
          + (isOptionsDark.value === true ? ' q-select__dialog--dark q-dark' : '')
          + (dialogFieldFocused.value === true ? ' q-select__dialog--focused' : '')
      }, content))
    }

    function onDialogBeforeHide (e) {
      onControlPopupHide(e);

      if (dialogRef.value !== null) {
        dialogRef.value.__updateRefocusTarget(
          state.rootRef.value.querySelector('.q-field__native > [tabindex]:last-child')
        );
      }

      state.focused.value = false;
    }

    function onDialogHide (e) {
      hidePopup();
      state.focused.value === false && emit('blur', e);
      resetInputValue();
    }

    function onDialogShow () {
      const el = document.activeElement;
      if (
        (el === null || el.id !== state.targetUid.value)
        && targetRef.value !== null
        && targetRef.value !== el
      ) {
        targetRef.value.focus();
      }

      setVirtualScrollSize();
    }

    function closeMenu () {
      if (dialog.value === true) {
        return
      }

      optionIndex.value = -1;

      if (menu.value === true) {
        menu.value = false;
      }

      if (state.focused.value === false) {
        if (filterId !== null) {
          clearTimeout(filterId);
          filterId = null;
        }

        if (state.innerLoading.value === true) {
          emit('filterAbort');
          state.innerLoading.value = false;
          innerLoadingIndicator.value = false;
        }
      }
    }

    function showPopup (e) {
      if (state.editable.value !== true) {
        return
      }

      if (hasDialog === true) {
        state.onControlFocusin(e);
        dialog.value = true;
        nextTick(() => {
          state.focus();
        });
      }
      else {
        state.focus();
      }

      if (props.onFilter !== void 0) {
        filter(inputValue.value);
      }
      else if (noOptions.value !== true || slots[ 'no-option' ] !== void 0) {
        menu.value = true;
      }
    }

    function hidePopup () {
      dialog.value = false;
      closeMenu();
    }

    function resetInputValue () {
      props.useInput === true && updateInputValue(
        props.multiple !== true && props.fillInput === true && innerValue.value.length !== 0
          ? getOptionLabel.value(innerValue.value[ 0 ]) || ''
          : '',
        true,
        true
      );
    }

    function updateMenu (show) {
      let optionIndex = -1;

      if (show === true) {
        if (innerValue.value.length !== 0) {
          const val = getOptionValue.value(innerValue.value[ 0 ]);
          optionIndex = props.options.findIndex(v => isDeepEqual(getOptionValue.value(v), val));
        }

        localResetVirtualScroll(optionIndex);
      }

      setOptionIndex(optionIndex);
    }

    function rerenderMenu (newLength, oldLength) {
      if (menu.value === true && state.innerLoading.value === false) {
        localResetVirtualScroll(-1, true);

        nextTick(() => {
          if (menu.value === true && state.innerLoading.value === false) {
            if (newLength > oldLength) {
              localResetVirtualScroll();
            }
            else {
              updateMenu(true);
            }
          }
        });
      }
    }

    function updateMenuPosition () {
      if (dialog.value === false && menuRef.value !== null) {
        menuRef.value.updatePosition();
      }
    }

    function onControlPopupShow (e) {
      e !== void 0 && stop(e);
      emit('popupShow', e);
      state.hasPopupOpen = true;
      state.onControlFocusin(e);
    }

    function onControlPopupHide (e) {
      e !== void 0 && stop(e);
      emit('popupHide', e);
      state.hasPopupOpen = false;
      state.onControlFocusout(e);
    }

    function updatePreState () {
      hasDialog = $q.platform.is.mobile !== true && props.behavior !== 'dialog'
        ? false
        : props.behavior !== 'menu' && (
          props.useInput === true
            ? slots[ 'no-option' ] !== void 0 || props.onFilter !== void 0 || noOptions.value === false
            : true
        );

      transitionShowComputed = $q.platform.is.ios === true && hasDialog === true && props.useInput === true
        ? 'fade'
        : props.transitionShow;
    }

    onBeforeUpdate(updatePreState);
    onUpdated(updateMenuPosition);

    updatePreState();

    onBeforeUnmount(() => {
      filterTimer !== null && clearTimeout(filterTimer);
      inputValueTimer !== null && clearTimeout(inputValueTimer);
    });

    // expose public methods
    Object.assign(proxy, {
      showPopup, hidePopup,
      removeAtIndex, add, toggleOption,
      getOptionIndex: () => optionIndex.value,
      setOptionIndex, moveOptionSelection,
      filter, updateMenuPosition, updateInputValue,
      isOptionSelected,
      getEmittingOptionValue,
      isOptionDisabled: (...args) => isOptionDisabled.value.apply(null, args) === true,
      getOptionValue: (...args) => getOptionValue.value.apply(null, args),
      getOptionLabel: (...args) => getOptionLabel.value.apply(null, args)
    });

    Object.assign(state, {
      innerValue,

      fieldClass: computed(() =>
        `q-select q-field--auto-height q-select--with${ props.useInput !== true ? 'out' : '' }-input`
        + ` q-select--with${ props.useChips !== true ? 'out' : '' }-chips`
        + ` q-select--${ props.multiple === true ? 'multiple' : 'single' }`
      ),

      inputRef,
      targetRef,
      hasValue,
      showPopup,

      floatingLabel: computed(() =>
        (props.hideSelected !== true && hasValue.value === true)
        || typeof inputValue.value === 'number'
        || inputValue.value.length !== 0
        || fieldValueIsFilled(props.displayValue)
      ),

      getControlChild: () => {
        if (
          state.editable.value !== false && (
            dialog.value === true // dialog always has menu displayed, so need to render it
            || noOptions.value !== true
            || slots[ 'no-option' ] !== void 0
          )
        ) {
          return hasDialog === true ? getDialog() : getMenu()
        }
        else if (state.hasPopupOpen === true) {
          // explicitly set it otherwise TAB will not blur component
          state.hasPopupOpen = false;
        }
      },

      controlEvents: {
        onFocusin (e) { state.onControlFocusin(e); },
        onFocusout (e) {
          state.onControlFocusout(e, () => {
            resetInputValue();
            closeMenu();
          });
        },
        onClick (e) {
          // label from QField will propagate click on the input
          prevent(e);

          if (hasDialog !== true && menu.value === true) {
            closeMenu();
            targetRef.value !== null && targetRef.value.focus();
            return
          }

          showPopup(e);
        }
      },

      getControl: fromDialog => {
        const child = getSelection();
        const isTarget = fromDialog === true || dialog.value !== true || hasDialog !== true;

        if (props.useInput === true) {
          child.push(getInput(fromDialog, isTarget));
        }
        // there can be only one (when dialog is opened the control in dialog should be target)
        else if (state.editable.value === true) {
          const attrs = isTarget === true ? comboboxAttrs.value : void 0;

          child.push(
            h('input', {
              ref: isTarget === true ? targetRef : void 0,
              key: 'd_t',
              class: 'q-select__focus-target',
              id: isTarget === true ? state.targetUid.value : void 0,
              value: ariaCurrentValue.value,
              readonly: true,
              'data-autofocus': fromDialog === true || props.autofocus === true || void 0,
              ...attrs,
              onKeydown: onTargetKeydown,
              onKeyup: onTargetKeyup,
              onKeypress: onTargetKeypress
            })
          );

          if (isTarget === true && typeof props.autocomplete === 'string' && props.autocomplete.length !== 0) {
            child.push(
              h('input', {
                class: 'q-select__autocomplete-input',
                autocomplete: props.autocomplete,
                tabindex: -1,
                onKeyup: onTargetAutocomplete
              })
            );
          }
        }

        if (nameProp.value !== void 0 && props.disable !== true && innerOptionsValue.value.length !== 0) {
          const opts = innerOptionsValue.value.map(value => h('option', { value, selected: true }));

          child.push(
            h('select', {
              class: 'hidden',
              name: nameProp.value,
              multiple: props.multiple
            }, opts)
          );
        }

        const attrs = props.useInput === true || isTarget !== true ? void 0 : state.splitAttrs.attributes.value;

        return h('div', {
          class: 'q-field__native row items-center',
          ...attrs,
          ...state.splitAttrs.listeners.value
        }, child)
      },

      getInnerAppend: () => (
        props.loading !== true && innerLoadingIndicator.value !== true && props.hideDropdownIcon !== true
          ? [
              h(QIcon, {
                class: 'q-select__dropdown-icon' + (menu.value === true ? ' rotate-180' : ''),
                name: dropdownArrowIcon.value
              })
            ]
          : null
      )
    });

    return useField(state)
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Select",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    class: {},
    dark: { type: Boolean },
    center: { type: Boolean },
    name: {},
    virtualScrollHorizontal: { type: Boolean },
    virtualScrollSliceSize: {},
    virtualScrollSliceRatioBefore: {},
    virtualScrollSliceRatioAfter: {},
    virtualScrollItemSize: {},
    virtualScrollStickySizeStart: {},
    virtualScrollStickySizeEnd: {},
    tableColspan: {},
    modelValue: {},
    error: { type: [Boolean, null] },
    errorMessage: {},
    noErrorIcon: { type: Boolean },
    rules: {},
    reactiveRules: { type: Boolean },
    lazyRules: { type: [Boolean, String] },
    label: {},
    stackLabel: { type: Boolean },
    hint: {},
    hideHint: { type: Boolean },
    prefix: {},
    suffix: {},
    labelColor: {},
    color: {},
    bgColor: {},
    loading: { type: Boolean },
    clearable: { type: Boolean },
    clearIcon: {},
    filled: { type: Boolean },
    outlined: { type: Boolean },
    borderless: { type: Boolean },
    standout: { type: [Boolean, String] },
    labelSlot: { type: Boolean },
    bottomSlots: { type: Boolean },
    hideBottomSpace: { type: Boolean },
    counter: { type: Boolean },
    rounded: { type: Boolean },
    square: { type: Boolean },
    dense: { type: Boolean },
    itemAligned: { type: Boolean },
    disable: { type: Boolean },
    readonly: { type: Boolean },
    autofocus: { type: Boolean },
    for: {},
    multiple: { type: Boolean },
    displayValue: {},
    displayValueHtml: { type: Boolean },
    options: {},
    optionValue: { type: [Function, String] },
    optionLabel: { type: [Function, String] },
    optionDisable: { type: [Function, String] },
    hideSelected: { type: Boolean },
    hideDropdownIcon: { type: Boolean },
    dropdownIcon: {},
    maxValues: {},
    optionsDense: { type: Boolean },
    optionsDark: { type: [Boolean, null] },
    optionsSelectedClass: {},
    optionsHtml: { type: Boolean },
    optionsCover: { type: Boolean },
    menuShrink: { type: Boolean },
    menuAnchor: {},
    menuSelf: {},
    menuOffset: {},
    popupContentClass: {},
    popupContentStyle: {},
    popupNoRouteDismiss: { type: Boolean },
    useChips: { type: Boolean },
    useInput: { type: Boolean },
    maxlength: {},
    fillInput: { type: Boolean },
    newValueMode: {},
    mapOptions: { type: Boolean },
    disableTabSelection: { type: Boolean },
    emitValue: { type: Boolean },
    inputDebounce: {},
    inputClass: {},
    inputStyle: {},
    tabindex: {},
    autocomplete: {},
    transitionShow: {},
    transitionHide: {},
    transitionDuration: {},
    behavior: {},
    onVirtualScroll: { type: Function },
    "onUpdate:modelValue": { type: Function },
    onFocus: { type: Function },
    onBlur: { type: Function },
    onClear: { type: Function },
    onInputValue: { type: Function },
    onRemove: { type: Function },
    onAdd: { type: Function },
    onNewValue: { type: Function },
    onFilter: { type: Function },
    onFilterAbort: { type: Function },
    onPopupShow: { type: Function },
    onPopupHide: { type: Function }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_select = __nuxt_component_0;
      _push(ssrRenderComponent(_component_q_select, mergeProps(props, {
        class: unref(cn)(
          props.class,
          props.dark ? "input-dark" : "",
          props.center ? "input-center" : ""
        ),
        modelValue: unref(modelValue),
        "onUpdate:modelValue": ($event) => isRef(modelValue) ? modelValue.value = $event : null
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/select/Select.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-116fb7d0"]]);

export { __nuxt_component_6 as _ };
//# sourceMappingURL=Select-C7pQfx6s.mjs.map
