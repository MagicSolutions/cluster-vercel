import { ref, onMounted, watch, computed, getCurrentInstance, onBeforeUpdate, inject, onBeforeUnmount, nextTick, onDeactivated, onActivated, h, Transition, useSSRContext, defineComponent, mergeProps, unref, isRef, createSlots, withCtx, renderSlot, provide } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { useVModel } from '@vueuse/core';
import { c as cn } from '../build/utils-H80jjgLf.mjs';
import { Q as QIcon, c as QSpinner, h as hSlot, s as shouldIgnoreKey, k as vmIsDestroyed } from './vm.mjs';
import { m as isRuntimeSsrPreHydration, o as formKey, s as stopAndPrevent, p as prevent, c as createComponent, b as stop } from '../build/server.mjs';
import { _ as _export_sfc } from '../build/_plugin-vue_export-helper-1tPrXgE0.mjs';

function injectProp (target, propName, get, set) {
  Object.defineProperty(target, propName, {
    get,
    set,
    enumerable: true
  });
  return target
}

function debounce (fn, wait = 250, immediate) {
  let timer = null;

  function debounced (/* ...args */) {
    const args = arguments;

    const later = () => {
      timer = null;
      if (immediate !== true) {
        fn.apply(this, args);
      }
    };

    if (timer !== null) {
      clearTimeout(timer);
    }
    else if (immediate === true) {
      fn.apply(this, args);
    }

    timer = setTimeout(later, wait);
  }

  debounced.cancel = () => {
    timer !== null && clearTimeout(timer);
  };

  return debounced
}

/**
 * Based on the work of https://github.com/jchook/uuid-random
 */

let
  buf,
  bufIdx = 0;
const hexBytes = new Array(256);

// Pre-calculate toString(16) for speed
for (let i = 0; i < 256; i++) {
  hexBytes[ i ] = (i + 0x100).toString(16).substring(1);
}

// Use best available PRNG
const randomBytes = (() => {
  // Node & Browser support
  const lib = typeof crypto !== 'undefined'
    ? crypto
    : (
        void 0
      );

  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes
    }
    if (lib.getRandomValues !== void 0) {
      return n => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes
      }
    }
  }

  return n => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r
  }
})();

// Buffer random numbers for speed
// Reduce memory usage by decreasing this number (min 16)
// or improve speed by increasing this number (try 16384)
const BUFFER_SIZE = 4096;

function uid () {
  // Buffer some random bytes for speed
  if (buf === void 0 || (bufIdx + 16 > BUFFER_SIZE)) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }

  const b = Array.prototype.slice.call(buf, bufIdx, (bufIdx += 16));
  b[ 6 ] = (b[ 6 ] & 0x0f) | 0x40;
  b[ 8 ] = (b[ 8 ] & 0x3f) | 0x80;

  return hexBytes[ b[ 0 ] ] + hexBytes[ b[ 1 ] ]
    + hexBytes[ b[ 2 ] ] + hexBytes[ b[ 3 ] ] + '-'
    + hexBytes[ b[ 4 ] ] + hexBytes[ b[ 5 ] ] + '-'
    + hexBytes[ b[ 6 ] ] + hexBytes[ b[ 7 ] ] + '-'
    + hexBytes[ b[ 8 ] ] + hexBytes[ b[ 9 ] ] + '-'
    + hexBytes[ b[ 10 ] ] + hexBytes[ b[ 11 ] ]
    + hexBytes[ b[ 12 ] ] + hexBytes[ b[ 13 ] ]
    + hexBytes[ b[ 14 ] ] + hexBytes[ b[ 15 ] ]
}

function parseValue (val) {
  return val === void 0 || val === null
    ? null
    : val
}

function getId (val, required) {
  return val === void 0 || val === null
    ? (required === true ? `f_${ uid() }` : null)
    : val
}

/**
 * Returns an "id" which is a ref() that can be used as
 * a unique identifier to apply to a DOM node attribute.
 *
 * On SSR, it takes care of generating the id on the client side (only) to
 * avoid hydration errors.
 */
function useId ({ getValue, required = true } = {}) {
  if (isRuntimeSsrPreHydration.value === true) {
    const id = getValue !== void 0
      ? ref(parseValue(getValue()))
      : ref(null);

    if (required === true && id.value === null) {
      onMounted(() => {
        id.value = `f_${ uid() }`; // getId(null, true)
      });
    }

    if (getValue !== void 0) {
      watch(getValue, newId => {
        id.value = getId(newId, required);
      });
    }

    return id
  }

  return getValue !== void 0
    ? computed(() => getId(getValue(), required))
    : ref(`f_${ uid() }`) // getId(null, true)
}

const listenerRE = /^on[A-Z]/;

function useSplitAttrs () {
  const { attrs, vnode } = getCurrentInstance();

  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };

  function update () {
    const attributes = {};
    const listeners = {};

    for (const key in attrs) {
      if (key !== 'class' && key !== 'style' && listenerRE.test(key) === false) {
        attributes[ key ] = attrs[ key ];
      }
    }

    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners[ key ] = vnode.props[ key ];
      }
    }

    acc.attributes.value = attributes;
    acc.listeners.value = listeners;
  }

  onBeforeUpdate(update);

  update();

  return acc
}

const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};

function useDark (props, $q) {
  // return isDark
  return computed(() => (
    props.dark === null
      ? $q.dark.isActive
      : props.dark
  ))
}

function useFormChild ({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);

  if ($form !== false) {
    const { props, proxy } = getCurrentInstance();

    // export public method (so it can be used in QForm)
    Object.assign(proxy, { validate, resetValidation });

    watch(() => props.disable, val => {
      if (val === true) {
        typeof resetValidation === 'function' && resetValidation();
        $form.unbindComponent(proxy);
      }
      else {
        $form.bindComponent(proxy);
      }
    });

    onMounted(() => {
      // register to parent QForm
      props.disable !== true && $form.bindComponent(proxy);
    });

    onBeforeUnmount(() => {
      // un-register from parent QForm
      props.disable !== true && $form.unbindComponent(proxy);
    });
  }
  else if (requiresQForm === true) {
    console.error('Parent QForm not found on useFormChild()!');
  }
}

// file referenced from docs

const
  hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/,
  hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/,
  hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/,
  rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;

// Keep in sync with ui/types/api/validation.d.ts
const testPattern = {
  date: v => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: v => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: v => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),

  // -- RFC 5322 --
  // -- Added in v2.6.6 --
  // This is a basic helper validation.
  // For something more complex (like RFC 822) you should write and use your own rule.
  // We won't be accepting PRs to enhance the one below because of the reason above.
  // eslint-disable-next-line
  email: v => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),

  hexColor: v => hex.test(v),
  hexaColor: v => hexa.test(v),
  hexOrHexaColor: v => hexOrHexa.test(v),

  rgbColor: v => rgb.test(v),
  rgbaColor: v => rgba.test(v),
  rgbOrRgbaColor: v => rgb.test(v) || rgba.test(v),

  hexOrRgbColor: v => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: v => hexa.test(v) || rgba.test(v),
  anyColor: v => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};

const lazyRulesValues = [ true, false, 'ondemand' ];

const useValidateProps = {
  modelValue: {},

  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,

  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [ Boolean, String ],
    default: false, // statement unneeded but avoids future vue implementation changes
    validator: v => lazyRulesValues.includes(v)
  }
};

function useValidate (focused, innerLoading) {
  const { props, proxy } = getCurrentInstance();

  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(false);

  useFormChild({ validate, resetValidation });

  let validateIndex = 0, unwatchRules;

  const hasRules = computed(() =>
    props.rules !== void 0
    && props.rules !== null
    && props.rules.length !== 0
  );

  const canDebounceValidate = computed(() => (
    props.disable !== true
    && hasRules.value === true
    // Should not have a validation in progress already;
    // It might mean that focus switched to submit btn and
    // QForm's submit() has been called already (ENTER key)
    && innerLoading.value === false
  ));

  const hasError = computed(() =>
    props.error === true || innerError.value === true
  );

  const errorMessage = computed(() => (
    typeof props.errorMessage === 'string' && props.errorMessage.length !== 0
      ? props.errorMessage
      : innerErrorMessage.value
  ));

  watch(() => props.modelValue, () => {
    isDirtyModel.value = true;

    if (
      canDebounceValidate.value === true
      // trigger validation if not using any kind of lazy-rules
      && props.lazyRules === false
    ) {
      debouncedValidate();
    }
  });

  function onRulesChange () {
    if (
      props.lazyRules !== 'ondemand'
      && canDebounceValidate.value === true
      && isDirtyModel.value === true
    ) {
      debouncedValidate();
    }
  }

  watch(() => props.reactiveRules, val => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props.rules, onRulesChange, { immediate: true, deep: true });
      }
    }
    else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });

  watch(() => props.lazyRules, onRulesChange);

  watch(focused, val => {
    if (val === true) {
      isDirtyModel.value = true;
    }
    else if (
      canDebounceValidate.value === true
      && props.lazyRules !== 'ondemand'
    ) {
      debouncedValidate();
    }
  });

  function resetValidation () {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = false;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }

  /*
   * Return value
   *   - true (validation succeeded)
   *   - false (validation failed)
   *   - Promise (pending async validation)
   */
  function validate (val = props.modelValue) {
    if (
      props.disable === true
      || hasRules.value === false
    ) {
      return true
    }

    const index = ++validateIndex;

    const setDirty = innerLoading.value !== true
      ? () => { isDirtyModel.value = true; }
      : () => {};

    const update = (err, msg) => {
      err === true && setDirty();

      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };

    const promises = [];

    for (let i = 0; i < props.rules.length; i++) {
      const rule = props.rules[ i ];
      let res;

      if (typeof rule === 'function') {
        res = rule(val, testPattern);
      }
      else if (typeof rule === 'string' && testPattern[ rule ] !== void 0) {
        res = testPattern[ rule ](val);
      }

      if (res === false || typeof res === 'string') {
        update(true, res);
        return false
      }
      else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }

    if (promises.length === 0) {
      update(false);
      return true
    }

    innerLoading.value = true;

    return Promise.all(promises).then(
      res => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update(false);
          return true
        }

        const msg = res.find(r => r === false || typeof r === 'string');
        index === validateIndex && update(msg !== void 0, msg);
        return msg === void 0
      },
      e => {
        if (index === validateIndex) {
          console.error(e);
          update(true);
        }

        return false
      }
    )
  }

  const debouncedValidate = debounce(validate, 0);

  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });

  // expose public methods & props
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, 'hasError', () => hasError.value);

  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,

    validate,
    resetValidation
  }
}

let queue = [];
let waitFlags = [];

function addFocusFn (fn) {
  if (waitFlags.length === 0) {
    fn();
  }
  else {
    queue.push(fn);
  }
}

function removeFocusFn (fn) {
  queue = queue.filter(entry => entry !== fn);
}

function fieldValueIsFilled (val) {
  return val !== void 0
    && val !== null
    && ('' + val).length !== 0
}

const useNonInputFieldProps = {
  ...useDarkProps,
  ...useValidateProps,

  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,

  labelColor: String,
  color: String,
  bgColor: String,

  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [ Boolean, String ],

  square: Boolean,

  loading: Boolean,

  labelSlot: Boolean,

  bottomSlots: Boolean,
  hideBottomSpace: Boolean,

  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,

  counter: Boolean,

  clearable: Boolean,
  clearIcon: String,

  disable: Boolean,
  readonly: Boolean,

  autofocus: Boolean,

  for: String
};

const useFieldProps = {
  ...useNonInputFieldProps,
  maxlength: [ Number, String ]
};

const useFieldEmits = [ 'update:modelValue', 'clear', 'focus', 'blur' ];

function useFieldState ({ requiredForAttr = true, tagProp, changeEvent = false } = {}) {
  const { props, proxy } = getCurrentInstance();

  const isDark = useDark(props, proxy.$q);
  const targetUid = useId({
    required: requiredForAttr,
    getValue: () => props.for
  });

  return {
    requiredForAttr,
    changeEvent,
    tag: tagProp === true
      ? computed(() => props.tag)
      : { value: 'label' },

    isDark,

    editable: computed(() =>
      props.disable !== true && props.readonly !== true
    ),

    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,

    splitAttrs: useSplitAttrs(),
    targetUid,

    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)

    /**
     * user supplied additionals:

     * innerValue - computed
     * floatingLabel - computed
     * inputRef - computed

     * fieldClass - computed
     * hasShadow - computed

     * controlEvents - Object with fn(e)

     * getControl - fn
     * getInnerAppend - fn
     * getControlChild - fn
     * getShadowControl - fn
     * showPopup - fn
     */
  }
}

function useField (state) {
  const { props, emit, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;

  let focusoutTimer = null;

  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props.modelValue));
  }

  if (state.emitValue === void 0) {
    state.emitValue = value => {
      emit('update:modelValue', value);
    };
  }

  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }

  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });

  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props.counter !== false) {
        const len = typeof props.modelValue === 'string' || typeof props.modelValue === 'number'
          ? ('' + props.modelValue).length
          : (Array.isArray(props.modelValue) === true ? props.modelValue.length : 0);

        const max = props.maxlength !== void 0
          ? props.maxlength
          : props.maxValues;

        return len + (max !== void 0 ? ' / ' + max : '')
      }
    });
  }

  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);

  const floatingLabel = state.floatingLabel !== void 0
    ? computed(() => props.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true)
    : computed(() => props.stackLabel === true || state.focused.value === true || state.hasValue.value === true);

  const shouldRenderBottom = computed(() =>
    props.bottomSlots === true
    || props.hint !== void 0
    || hasRules.value === true
    || props.counter === true
    || props.error !== null
  );

  const styleType = computed(() => {
    if (props.filled === true) { return 'filled' }
    if (props.outlined === true) { return 'outlined' }
    if (props.borderless === true) { return 'borderless' }
    if (props.standout) { return 'standout' }
    return 'standard'
  });

  const classes = computed(() =>
    `q-field row no-wrap items-start q-field--${ styleType.value }`
    + (state.fieldClass !== void 0 ? ` ${ state.fieldClass.value }` : '')
    + (props.rounded === true ? ' q-field--rounded' : '')
    + (props.square === true ? ' q-field--square' : '')
    + (floatingLabel.value === true ? ' q-field--float' : '')
    + (hasLabel.value === true ? ' q-field--labeled' : '')
    + (props.dense === true ? ' q-field--dense' : '')
    + (props.itemAligned === true ? ' q-field--item-aligned q-item-type' : '')
    + (state.isDark.value === true ? ' q-field--dark' : '')
    + (state.getControl === void 0 ? ' q-field--auto-height' : '')
    + (state.focused.value === true ? ' q-field--focused' : '')
    + (hasError.value === true ? ' q-field--error' : '')
    + (hasError.value === true || state.focused.value === true ? ' q-field--highlighted' : '')
    + (props.hideBottomSpace !== true && shouldRenderBottom.value === true ? ' q-field--with-bottom' : '')
    + (props.disable === true ? ' q-field--disabled' : (props.readonly === true ? ' q-field--readonly' : ''))
  );

  const contentClass = computed(() =>
    'q-field__control relative-position row no-wrap'
    + (props.bgColor !== void 0 ? ` bg-${ props.bgColor }` : '')
    + (
      hasError.value === true
        ? ' text-negative'
        : (
            typeof props.standout === 'string' && props.standout.length !== 0 && state.focused.value === true
              ? ` ${ props.standout }`
              : (props.color !== void 0 ? ` text-${ props.color }` : '')
          )
    )
  );

  const hasLabel = computed(() =>
    props.labelSlot === true || props.label !== void 0
  );

  const labelClass = computed(() =>
    'q-field__label no-pointer-events absolute ellipsis'
    + (props.labelColor !== void 0 && hasError.value !== true ? ` text-${ props.labelColor }` : '')
  );

  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props.modelValue,
    emitValue: state.emitValue
  }));

  const attributes = computed(() => {
    const acc = {};

    if (state.targetUid.value) {
      acc.for = state.targetUid.value;
    }

    if (props.disable === true) {
      acc[ 'aria-disabled' ] = 'true';
    }

    return acc
  });

  function focusHandler () {
    const el = document.activeElement;
    let target = state.targetRef !== void 0 && state.targetRef.value;

    if (target && (el === null || el.id !== state.targetUid.value)) {
      target.hasAttribute('tabindex') === true || (target = target.querySelector('[tabindex]'));
      if (target && target !== el) {
        target.focus({ preventScroll: true });
      }
    }
  }

  function focus () {
    addFocusFn(focusHandler);
  }

  function blur () {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }

  function onControlFocusin (e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }

    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit('focus', e);
    }
  }

  function onControlFocusout (e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;

      if (
        document.hasFocus() === true && (
          state.hasPopupOpen === true
          || state.controlRef === void 0
          || state.controlRef.value === null
          || state.controlRef.value.contains(document.activeElement) !== false
        )
      ) {
        return
      }

      if (state.focused.value === true) {
        state.focused.value = false;
        emit('blur', e);
      }

      then !== void 0 && then();
    });
  }

  function clearValue (e) {
    // prevent activating the field but keep focus on desktop
    stopAndPrevent(e);

    if ($q.platform.is.mobile !== true) {
      const el = (state.targetRef !== void 0 && state.targetRef.value) || state.rootRef.value;
      el.focus();
    }
    else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }

    if (props.type === 'file') {
      // do not let focus be triggered
      // as it will make the native file dialog
      // appear for another selection
      state.inputRef.value.value = null;
    }

    emit('update:modelValue', null);
    state.changeEvent === true && emit('change', null);
    emit('clear', props.modelValue);

    nextTick(() => {
      const isDirty = isDirtyModel.value;
      resetValidation();
      isDirtyModel.value = isDirty;
    });
  }

  function onClearableKeyup (evt) {
    [ 13, 32 ].includes(evt.keyCode) && clearValue(evt);
  }

  function getContent () {
    const node = [];

    slots.prepend !== void 0 && node.push(
      h('div', {
        class: 'q-field__prepend q-field__marginal row no-wrap items-center',
        key: 'prepend',
        onClick: prevent
      }, slots.prepend())
    );

    node.push(
      h('div', {
        class: 'q-field__control-container col relative-position row no-wrap q-anchor--skip'
      }, getControlContainer())
    );

    hasError.value === true && props.noErrorIcon === false && node.push(
      getInnerAppendNode('error', [
        h(QIcon, { name: $q.iconSet.field.error, color: 'negative' })
      ])
    );

    if (props.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          'inner-loading-append',
          slots.loading !== void 0
            ? slots.loading()
            : [ h(QSpinner, { color: props.color }) ]
        )
      );
    }
    else if (props.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode('inner-clearable-append', [
          h(QIcon, {
            class: 'q-field__focusable-action',
            name: props.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            role: 'button',
            'aria-hidden': 'false',
            'aria-label': $q.lang.label.clear,
            onKeyup: onClearableKeyup,
            onClick: clearValue
          })
        ])
      );
    }

    slots.append !== void 0 && node.push(
      h('div', {
        class: 'q-field__append q-field__marginal row no-wrap items-center',
        key: 'append',
        onClick: prevent
      }, slots.append())
    );

    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode('inner-append', state.getInnerAppend())
    );

    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );

    return node
  }

  function getControlContainer () {
    const node = [];

    props.prefix !== void 0 && props.prefix !== null && node.push(
      h('div', {
        class: 'q-field__prefix no-pointer-events row items-center'
      }, props.prefix)
    );

    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }

    if (state.getControl !== void 0) {
      node.push(state.getControl());
    }
    // internal usage only:
    else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    }
    else if (slots.control !== void 0) {
      node.push(
        h('div', {
          ref: state.targetRef,
          class: 'q-field__native row',
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }

    hasLabel.value === true && node.push(
      h('div', {
        class: labelClass.value
      }, hSlot(slots.label, props.label))
    );

    props.suffix !== void 0 && props.suffix !== null && node.push(
      h('div', {
        class: 'q-field__suffix no-pointer-events row items-center'
      }, props.suffix)
    );

    return node.concat(hSlot(slots.default))
  }

  function getBottom () {
    let msg, key;

    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [ h('div', { role: 'alert' }, errorMessage.value) ];
        key = `q--slot-error-${ errorMessage.value }`;
      }
      else {
        msg = hSlot(slots.error);
        key = 'q--slot-error';
      }
    }
    else if (props.hideHint !== true || state.focused.value === true) {
      if (props.hint !== void 0) {
        msg = [ h('div', props.hint) ];
        key = `q--slot-hint-${ props.hint }`;
      }
      else {
        msg = hSlot(slots.hint);
        key = 'q--slot-hint';
      }
    }

    const hasCounter = props.counter === true || slots.counter !== void 0;

    if (props.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return
    }

    const main = h('div', {
      key,
      class: 'q-field__messages col'
    }, msg);

    return h('div', {
      class: 'q-field__bottom row items-start q-field__bottom--'
        + (props.hideBottomSpace !== true ? 'animated' : 'stale'),
      onClick: prevent
    }, [
      props.hideBottomSpace === true
        ? main
        : h(Transition, { name: 'q-transition--field-message' }, () => main),

      hasCounter === true
        ? h('div', {
          class: 'q-field__counter'
        }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value)
        : null
    ])
  }

  function getInnerAppendNode (key, content) {
    return content === null
      ? null
      : h('div', {
        key,
        class: 'q-field__append q-field__marginal row no-wrap items-center q-anchor--skip'
      }, content)
  }

  let shouldActivate = false;

  onDeactivated(() => {
    shouldActivate = true;
  });

  onActivated(() => {
    shouldActivate === true && props.autofocus === true && proxy.focus();
  });

  props.autofocus === true && onMounted(() => {
    proxy.focus();
  });

  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });

  // expose public methods
  Object.assign(proxy, { focus, blur });

  return function renderField () {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0
      ? {
          ...state.splitAttrs.attributes.value,
          'data-autofocus': props.autofocus === true || void 0,
          ...attributes.value
        }
      : attributes.value;

    return h(state.tag.value, {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0
        ? h('div', {
          class: 'q-field__before q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.before())
        : null,

      h('div', {
        class: 'q-field__inner relative-position col self-stretch'
      }, [
        h('div', {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),

        shouldRenderBottom.value === true
          ? getBottom()
          : null
      ]),

      slots.after !== void 0
        ? h('div', {
          class: 'q-field__after q-field__marginal row no-wrap items-center',
          onClick: prevent
        }, slots.after())
        : null
    ])
  }
}

// leave NAMED_MASKS at top of file (code referenced from docs)
const NAMED_MASKS = {
  date: '####/##/##',
  datetime: '####/##/## ##:##',
  time: '##:##',
  fulltime: '##:##:##',
  phone: '(###) ### - ####',
  card: '#### #### #### ####'
};

const TOKENS = {
  '#': { pattern: '[\\d]', negate: '[^\\d]' },

  S: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]' },
  N: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]' },

  A: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  a: { pattern: '[a-zA-Z]', negate: '[^a-zA-Z]', transform: v => v.toLocaleLowerCase() },

  X: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleUpperCase() },
  x: { pattern: '[0-9a-zA-Z]', negate: '[^0-9a-zA-Z]', transform: v => v.toLocaleLowerCase() }
};

const KEYS = Object.keys(TOKENS);
KEYS.forEach(key => {
  TOKENS[ key ].regex = new RegExp(TOKENS[ key ].pattern);
});

const
  tokenRegexMask = new RegExp('\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([' + KEYS.join('') + '])|(.)', 'g'),
  escRegex = /[.*+?^${}()|[\]\\]/g;

const MARKER = String.fromCharCode(1);

const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [ Boolean, String ],
  unmaskedValue: Boolean
};

function useMask (props, emit, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;

  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());

  function getIsTypeText () {
    return props.autogrow === true
      || [ 'textarea', 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
  }

  watch(() => props.type + props.autogrow, updateMaskInternals);

  watch(() => props.mask, v => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    }
    else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props.modelValue !== val && emit('update:modelValue', val);
    }
  });

  watch(() => props.fillMask + props.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });

  watch(() => props.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });

  function getInitialMaskedValue () {
    updateMaskInternals();

    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props.modelValue));

      return props.fillMask !== false
        ? fillWithMask(masked)
        : masked
    }

    return props.modelValue
  }

  function getPaddedMaskMarked (size) {
    if (size < maskMarked.length) {
      return maskMarked.slice(-size)
    }

    let pad = '', localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);

    if (padPos !== -1) {
      for (let i = size - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }

      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }

    return localMaskMarked
  }

  function updateMaskInternals () {
    hasMask.value = props.mask !== void 0
      && props.mask.length !== 0
      && getIsTypeText();

    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = '';
      maskReplaced = '';
      return
    }

    const
      localComputedMask = NAMED_MASKS[ props.mask ] === void 0
        ? props.mask
        : NAMED_MASKS[ props.mask ],
      fillChar = typeof props.fillMask === 'string' && props.fillMask.length !== 0
        ? props.fillMask.slice(0, 1)
        : '_',
      fillCharEscaped = fillChar.replace(escRegex, '\\$&'),
      unmask = [],
      extract = [],
      mask = [];

    let
      firstMatch = props.reverseFillMask === true,
      unmaskChar = '',
      negateChar = '';

    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[ token ];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push('(?:' + negateChar + '+)?(' + c.pattern + '+)?(?:' + negateChar + '+)?(' + c.pattern + '+)?');
          firstMatch = false;
        }
        extract.push('(?:' + negateChar + '+)?(' + c.pattern + ')?');
      }
      else if (esc !== void 0) {
        unmaskChar = '\\' + (esc === '\\' ? '' : esc);
        mask.push(esc);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
      else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === '\\' ? '\\\\\\\\' : c.replace(escRegex, '\\\\$&');
        mask.push(c);
        unmask.push('([^' + unmaskChar + ']+)?' + unmaskChar + '?');
      }
    });

    const
      unmaskMatcher = new RegExp(
        '^'
        + unmask.join('')
        + '(' + (unmaskChar === '' ? '.' : '[^' + unmaskChar + ']') + '+)?'
        + (unmaskChar === '' ? '' : '[' + unmaskChar + ']*') + '$'
      ),
      extractLast = extract.length - 1,
      extractMatcher = extract.map((re, index) => {
        if (index === 0 && props.reverseFillMask === true) {
          return new RegExp('^' + fillCharEscaped + '*' + re)
        }
        else if (index === extractLast) {
          return new RegExp(
            '^' + re
            + '(' + (negateChar === '' ? '.' : negateChar) + '+)?'
            + (props.reverseFillMask === true ? '$' : fillCharEscaped + '*')
          )
        }

        return new RegExp('^' + re)
      });

    computedMask = mask;
    computedUnmask = val => {
      const unmaskMatch = unmaskMatcher.exec(props.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join('');
      }

      const
        extractMatch = [],
        extractMatcherLength = extractMatcher.length;

      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[ i ].exec(str);

        if (m === null) {
          break
        }

        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join('')
      }

      return val
    };
    maskMarked = mask.map(v => (typeof v === 'string' ? v : MARKER)).join('');
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }

  function updateMaskValue (rawVal, updateMaskInternalsFlag, inputType) {
    const
      inp = inputRef.value,
      end = inp.selectionEnd,
      endReverse = inp.value.length - end,
      unmasked = unmaskValue(rawVal);

    // Update here so unmask uses the original fillChar
    updateMaskInternalsFlag === true && updateMaskInternals();

    const
      preMasked = maskValue(unmasked),
      masked = props.fillMask !== false
        ? fillWithMask(preMasked)
        : preMasked,
      changed = innerValue.value !== masked;

    // We want to avoid "flickering" so we set value immediately
    inp.value !== masked && (inp.value = masked);

    changed === true && (innerValue.value = masked);

    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, 'forward');

        return
      }

      if (inputType === 'insertFromPaste' && props.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        // each non-marker char means we move once to right
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[ i ] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);

        return
      }

      if ([ 'deleteContentBackward', 'deleteContentForward' ].indexOf(inputType) !== -1) {
        const cursor = props.reverseFillMask === true
          ? (
              end === 0
                ? (masked.length > preMasked.length ? 1 : 0)
                : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1
            )
          : end;

        inp.setSelectionRange(cursor, cursor, 'forward');
        return
      }

      if (props.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));

          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, 'forward');
          }
          else {
            moveCursor.rightReverse(inp, cursor);
          }
        }
        else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, 'backward');
        }
      }
      else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        }
        else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });

    const val = props.unmaskedValue === true
      ? unmaskValue(masked)
      : masked;

    if (
      String(props.modelValue) !== val
      && (props.modelValue !== null || val !== '')
    ) {
      emitValue(val, true);
    }
  }

  function moveCursorForPaste (inp, start, end) {
    const preMasked = maskValue(unmaskValue(inp.value));

    start = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start));
    pastedTextStart = start;

    inp.setSelectionRange(start, end, 'forward');
  }

  const moveCursor = {
    left (inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break
        }
      }

      if (
        i < 0
        && maskMarked[ cursor ] !== void 0
        && maskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.right(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    right (inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (maskMarked[ i ] === MARKER) {
          cursor = i;
          break
        }
        else if (maskMarked[ i - 1 ] === MARKER) {
          cursor = i;
        }
      }

      if (
        i > limit
        && maskMarked[ cursor - 1 ] !== void 0
        && maskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.left(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    },

    leftReverse (inp, cursor) {
      const
        localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);

      for (; i >= 0; i--) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          break
        }
        else if (localMaskMarked[ i ] === MARKER) {
          cursor = i;
          if (i === 0) {
            break
          }
        }
      }

      if (
        i < 0
        && localMaskMarked[ cursor ] !== void 0
        && localMaskMarked[ cursor ] !== MARKER
      ) {
        return moveCursor.rightReverse(inp, 0)
      }

      cursor >= 0 && inp.setSelectionRange(cursor, cursor, 'backward');
    },

    rightReverse (inp, cursor) {
      const
        limit = inp.value.length,
        localMaskMarked = getPaddedMaskMarked(limit),
        noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);

      for (; i <= limit; i++) {
        if (localMaskMarked[ i - 1 ] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break
        }
      }

      if (
        i > limit
        && localMaskMarked[ cursor - 1 ] !== void 0
        && localMaskMarked[ cursor - 1 ] !== MARKER
      ) {
        return moveCursor.leftReverse(inp, limit)
      }

      inp.setSelectionRange(cursor, cursor, 'forward');
    }
  };

  function onMaskedClick (e) {
    emit('click', e);

    selectionAnchor = void 0;
  }

  function onMaskedKeydown (e) {
    emit('keydown', e);

    if (
      shouldIgnoreKey(e) === true
      || e.altKey === true // let browser handle these
    ) {
      return
    }

    const
      inp = inputRef.value,
      start = inp.selectionStart,
      end = inp.selectionEnd;

    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }

    if (e.keyCode === 37 || e.keyCode === 39) { // Left / Right
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === 'forward' ? start : end;
      }

      const fn = moveCursor[ (e.keyCode === 39 ? 'right' : 'left') + (props.reverseFillMask === true ? 'Reverse' : '') ];

      e.preventDefault();
      fn(inp, selectionAnchor === start ? end : start);

      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), 'forward');
      }
    }
    else if (
      e.keyCode === 8 // Backspace
      && props.reverseFillMask !== true
      && start === end
    ) {
      moveCursor.left(inp, start);
      inp.setSelectionRange(inp.selectionStart, end, 'backward');
    }
    else if (
      e.keyCode === 46 // Delete
      && props.reverseFillMask === true
      && start === end
    ) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start, inp.selectionEnd, 'forward');
    }
  }

  function maskValue (val) {
    if (val === void 0 || val === null || val === '') { return '' }

    if (props.reverseFillMask === true) {
      return maskValueReverse(val)
    }

    const mask = computedMask;

    let valIndex = 0, output = '';

    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const
        valChar = val[ valIndex ],
        maskDef = mask[ maskIndex ];

      if (typeof maskDef === 'string') {
        output += maskDef;
        valChar === maskDef && valIndex++;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0
          ? maskDef.transform(valChar)
          : valChar;
        valIndex++;
      }
      else {
        return output
      }
    }

    return output
  }

  function maskValueReverse (val) {
    const
      mask = computedMask,
      firstTokenIndex = maskMarked.indexOf(MARKER);

    let valIndex = val.length - 1, output = '';

    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex !== -1; maskIndex--) {
      const maskDef = mask[ maskIndex ];

      let valChar = val[ valIndex ];

      if (typeof maskDef === 'string') {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      }
      else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[ valIndex ];
        // eslint-disable-next-line no-unmodified-loop-condition
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar))
      }
      else {
        return output
      }
    }

    return output
  }

  function unmaskValue (val) {
    return typeof val !== 'string' || computedUnmask === void 0
      ? (typeof val === 'number' ? computedUnmask('' + val) : val)
      : computedUnmask(val)
  }

  function fillWithMask (val) {
    if (maskReplaced.length - val.length <= 0) {
      return val
    }

    return props.reverseFillMask === true && val.length !== 0
      ? maskReplaced.slice(0, -val.length) + val
      : val + maskReplaced.slice(val.length)
  }

  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  }
}

const useFormProps = {
  name: String
};

function useFormInputNameAttr (props) {
  return computed(() => props.name || props.for)
}

function useFileFormDomProps (props, typeGuard) {
  function getFormDomProps () {
    const model = props.modelValue;

    try {
      const dt = 'DataTransfer' in window
        ? new DataTransfer()
        : ('ClipboardEvent' in window
            ? new ClipboardEvent('').clipboardData
            : void 0
          );

      if (Object(model) === model) {
        ('length' in model
          ? Array.from(model)
          : [ model ]
        ).forEach(file => {
          dt.items.add(file);
        });
      }

      return {
        files: dt.files
      }
    }
    catch (e) {
      return {
        files: void 0
      }
    }
  }

  return computed(() => {
      if (props.type !== 'file') {
        return
      }

      return getFormDomProps()
    })
    
}

function useKeyComposition (onInput) {
  return function onComposition (e) {
    if (e.type === 'compositionend' || e.type === 'change') {
      if (e.target.qComposing !== true) return
      e.target.qComposing = false;
      onInput(e);
    }
    else if (e.type === 'compositionstart') {
      e.target.qComposing = true;
    }
  }
}

const __nuxt_component_0 = createComponent({
  name: 'QInput',

  inheritAttrs: false,

  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,

    // override of useFieldProps > modelValue
    modelValue: {} // SSR does not know about FileList
      ,

    shadowText: String,

    type: {
      type: String,
      default: 'text'
    },

    debounce: [ String, Number ],

    autogrow: Boolean, // makes a textarea

    inputClass: [ Array, String, Object ],
    inputStyle: [ Array, String, Object ]
  },

  emits: [
    ...useFieldEmits,
    'paste', 'change',
    'keydown', 'click', 'animationend'
  ],

  setup (props, { emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;

    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;

    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props);

    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props, emit, emitValue, inputRef);

    const formDomProps = useFileFormDomProps(props);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));

    const onComposition = useKeyComposition(onInput);

    const state = useFieldState({ changeEvent: true });

    const isTextarea = computed(() =>
      props.type === 'textarea' || props.autogrow === true
    );

    const isTypeText = computed(() =>
      isTextarea.value === true
      || [ 'text', 'search', 'url', 'tel', 'password' ].includes(props.type)
    );

    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };

      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;

      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        // reset selection anchor on pointer selection
        evt.onClick = onMaskedClick;
      }

      if (props.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }

      return evt
    });

    const inputAttrs = computed(() => {
      const attrs = {
        tabindex: 0,
        'data-autofocus': props.autofocus === true || void 0,
        rows: props.type === 'textarea' ? 6 : void 0,
        'aria-label': props.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props.maxlength,
        disabled: props.disable === true,
        readonly: props.readonly === true
      };

      if (isTextarea.value === false) {
        attrs.type = props.type;
      }

      if (props.autogrow === true) {
        attrs.rows = 1;
      }

      return attrs
    });

    // some browsers lose the native input value
    // so we need to reattach it dynamically
    // (like type="password" <-> type="text"; see #12078)
    watch(() => props.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props.modelValue;
      }
    });

    watch(() => props.modelValue, v => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;

          if (String(v) === emitCachedValue) {
            return
          }
        }

        updateMaskValue(v);
      }
      else if (innerValue.value !== v) {
        innerValue.value = v;

        if (
          props.type === 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          if (typedNumber === true) {
            typedNumber = false;
          }
          else {
            delete temp.value;
          }
        }
      }

      // textarea only
      props.autogrow === true && nextTick(adjustHeight);
    });

    watch(() => props.autogrow, val => {
      // textarea only
      if (val === true) {
        nextTick(adjustHeight);
      }
      // if it has a number of rows set respect it
      else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = 'auto';
      }
    });

    watch(() => props.dense, () => {
      props.autogrow === true && nextTick(adjustHeight);
    });

    function focus () {
      addFocusFn(() => {
        const el = document.activeElement;
        if (
          inputRef.value !== null
          && inputRef.value !== el
          && (el === null || el.id !== state.targetUid.value)
        ) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }

    function select () {
      inputRef.value !== null && inputRef.value.select();
    }

    function onPaste (e) {
      if (hasMask.value === true && props.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }

      emit('paste', e);
    }

    function onInput (e) {
      if (!e || !e.target) {
        return
      }

      if (props.type === 'file') {
        emit('update:modelValue', e.target.files);
        return
      }

      const val = e.target.value;

      if (e.target.qComposing === true) {
        temp.value = val;

        return
      }

      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      }
      else {
        emitValue(val);

        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;

          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }

      // we need to trigger it immediately too,
      // to avoid "flickering"
      props.autogrow === true && adjustHeight();
    }

    function onAnimationend (e) {
      emit('animationend', e);
      adjustHeight();
    }

    function emitValue (val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;

        if (
          props.type !== 'number'
          && temp.hasOwnProperty('value') === true
        ) {
          delete temp.value;
        }

        if (props.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;

          stopWatcher === true && (stopValueWatcher = true);
          emit('update:modelValue', val);

          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }

        emitValueFn = void 0;
      };

      if (props.type === 'number') {
        typedNumber = true;
        temp.value = val;
      }

      if (props.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props.debounce);
      }
      else {
        emitValueFn();
      }
    }

    // textarea only
    function adjustHeight () {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          // chrome does not keep scroll #15498
          const { scrollTop } = inp;
          // chrome calculates a smaller scrollHeight when in a .column container
          const { overflowY, maxHeight } = $q.platform.is.firefox === true
            ? {}
            : window.getComputedStyle(inp);
          // on firefox or if overflowY is specified as scroll #14263, #14344
          // we don't touch overflow
          // firefox is not so bad in the end
          const changeOverflow = overflowY !== void 0 && overflowY !== 'scroll';

          // reset height of textarea to a small size to detect the real height
          // but keep the total control size the same
          changeOverflow === true && (inp.style.overflowY = 'hidden');
          parentStyle.marginBottom = (inp.scrollHeight - 1) + 'px';
          inp.style.height = '1px';

          inp.style.height = inp.scrollHeight + 'px';
          // we should allow scrollbars only
          // if there is maxHeight and content is taller than maxHeight
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? 'auto' : 'hidden');
          parentStyle.marginBottom = '';
          inp.scrollTop = scrollTop;
        }
      });
    }

    function onChange (e) {
      onComposition(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn !== void 0 && emitValueFn();

      emit('change', e.target.value);
    }

    function onFinishEditing (e) {
      e !== void 0 && stop(e);

      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }

      emitValueFn !== void 0 && emitValueFn();

      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;

      // we need to use setTimeout instead of this.$nextTick
      // to avoid a bug where focusout is not emitted for type date/time/week/...
      props.type !== 'file' && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : '';
        }
      });
    }

    function getCurValue () {
      return temp.hasOwnProperty('value') === true
        ? temp.value
        : (innerValue.value !== void 0 ? innerValue.value : '')
    }

    onBeforeUnmount(() => {
      onFinishEditing();
    });

    onMounted(() => {
      // textarea only
      props.autogrow === true && adjustHeight();
    });

    Object.assign(state, {
      innerValue,

      fieldClass: computed(() =>
        `q-${ isTextarea.value === true ? 'textarea' : 'input' }`
        + (props.autogrow === true ? ' q-textarea--autogrow' : '')
      ),

      hasShadow: computed(() =>
        props.type !== 'file'
        && typeof props.shadowText === 'string'
        && props.shadowText.length !== 0
      ),

      inputRef,

      emitValue,

      hasValue,

      floatingLabel: computed(() =>
        (
          hasValue.value === true
          && (props.type !== 'number' || isNaN(innerValue.value) === false)
        )
        || fieldValueIsFilled(props.displayValue)
      ),

      getControl: () => {
        return h(isTextarea.value === true ? 'textarea' : 'input', {
          ref: inputRef,
          class: [
            'q-field__native q-placeholder',
            props.inputClass
          ],
          style: props.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...(
            props.type !== 'file'
              ? { value: getCurValue() }
              : formDomProps.value
          )
        })
      },

      getShadowControl: () => {
        return h('div', {
          class: 'q-field__native q-field__shadow absolute-bottom no-pointer-events'
            + (isTextarea.value === true ? '' : ' text-no-wrap')
        }, [
          h('span', { class: 'invisible' }, getCurValue()),
          h('span', props.shadowText)
        ])
      }
    });

    const renderFn = useField(state);

    // expose public methods
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value // deprecated
    });

    injectProp(proxy, 'nativeEl', () => inputRef.value);

    return renderFn
  }
});

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Input",
  __ssrInlineRender: true,
  props: {
    defaultValue: {},
    class: {},
    dark: { type: Boolean },
    size: {},
    name: {},
    mask: {},
    fillMask: { type: [Boolean, String] },
    reverseFillMask: { type: Boolean },
    unmaskedValue: { type: Boolean },
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
    shadowText: {},
    type: {},
    debounce: {},
    maxlength: {},
    autogrow: { type: Boolean },
    inputClass: {},
    inputStyle: {},
    "onUpdate:modelValue": { type: Function },
    onFocus: { type: Function },
    onBlur: { type: Function },
    onClear: { type: Function }
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emits = __emit;
    const modelValue = useVModel(props, "modelValue", emits, {
      passive: true,
      defaultValue: props.defaultValue
    });
    const onModelUpdate = (newValue) => {
      if (!newValue) newValue = "";
      if (`${newValue}`.length > 0 && /^-?[0-9.,]+$/.test(`${newValue}`) && newValue !== "-")
        newValue = parseFloat(`${newValue}`);
      emits("update:modelValue", newValue);
      modelValue.value = newValue;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_q_input = __nuxt_component_0;
      _push(ssrRenderComponent(_component_q_input, mergeProps(props, {
        modelValue: unref(modelValue),
        "onUpdate:modelValue": [($event) => isRef(modelValue) ? modelValue.value = $event : null, onModelUpdate],
        class: unref(cn)(props.class, props.dark ? "input-dark" : "", `input-${_ctx.size}`)
      }, _attrs), createSlots({ _: 2 }, [
        _ctx.$slots.before ? {
          name: "before",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "before", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "before", {}, void 0, true)
              ];
            }
          }),
          key: "0"
        } : void 0,
        _ctx.$slots.prepend ? {
          name: "prepend",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "prepend", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "prepend", {}, void 0, true)
              ];
            }
          }),
          key: "1"
        } : void 0,
        _ctx.$slots.append ? {
          name: "append",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "append", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "append", {}, void 0, true)
              ];
            }
          }),
          key: "2"
        } : void 0,
        _ctx.$slots.hint ? {
          name: "hint",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "hint", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "hint", {}, void 0, true)
              ];
            }
          }),
          key: "3"
        } : void 0,
        _ctx.$slots.after ? {
          name: "after",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderSlot(_ctx.$slots, "after", {}, null, _push2, _parent2, _scopeId);
            } else {
              return [
                renderSlot(_ctx.$slots, "after", {}, void 0, true)
              ];
            }
          }),
          key: "4"
        } : void 0
      ]), _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/input/Input.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8fb95f5f"]]);

const __nuxt_component_1 = createComponent({
  name: 'QForm',

  props: {
    autofocus: Boolean,
    noErrorFocus: Boolean,
    noResetFocus: Boolean,
    greedy: Boolean,

    onSubmit: Function
  },

  emits: [ 'reset', 'validationSuccess', 'validationError' ],

  setup (props, { slots, emit }) {
    const vm = getCurrentInstance();
    const rootRef = ref(null);

    let validateIndex = 0;
    const registeredComponents = [];

    function validate (shouldFocus) {
      const focus = typeof shouldFocus === 'boolean'
        ? shouldFocus
        : props.noErrorFocus !== true;

      const index = ++validateIndex;

      const emitEvent = (res, ref) => {
        emit(`validation${ res === true ? 'Success' : 'Error' }`, ref);
      };

      const validateComponent = comp => {
        const valid = comp.validate();

        return typeof valid.then === 'function'
          ? valid.then(
            valid => ({ valid, comp }),
            err => ({ valid: false, comp, err })
          )
          : Promise.resolve({ valid, comp })
      };

      const errorsPromise = props.greedy === true
        ? Promise
          .all(registeredComponents.map(validateComponent))
          .then(res => res.filter(r => r.valid !== true))
        : registeredComponents
          .reduce(
            (acc, comp) => acc.then(() => {
              return validateComponent(comp).then(r => {
                if (r.valid === false) { return Promise.reject(r) }
              })
            }),
            Promise.resolve()
          )
          .catch(error => [ error ]);

      return errorsPromise.then(errors => {
        if (errors === void 0 || errors.length === 0) {
          index === validateIndex && emitEvent(true);
          return true
        }

        // if not outdated already
        if (index === validateIndex) {
          const { comp, err } = errors[ 0 ];

          err !== void 0 && console.error(err);
          emitEvent(false, comp);

          if (focus === true) {
            // Try to focus first mounted and active component
            const activeError = errors.find(({ comp }) => (
              typeof comp.focus === 'function'
              && vmIsDestroyed(comp.$) === false
            ));

            if (activeError !== void 0) {
              activeError.comp.focus();
            }
          }
        }

        return false
      })
    }

    function resetValidation () {
      validateIndex++;

      registeredComponents.forEach(comp => {
        typeof comp.resetValidation === 'function' && comp.resetValidation();
      });
    }

    function submit (evt) {
      evt !== void 0 && stopAndPrevent(evt);

      const index = validateIndex + 1;

      validate().then(val => {
        // if not outdated && validation succeeded
        if (index === validateIndex && val === true) {
          if (props.onSubmit !== void 0) {
            emit('submit', evt);
          }
          else if (evt !== void 0 && evt.target !== void 0 && typeof evt.target.submit === 'function') {
            evt.target.submit();
          }
        }
      });
    }

    function reset (evt) {
      evt !== void 0 && stopAndPrevent(evt);

      emit('reset');

      nextTick(() => { // allow userland to reset values before
        resetValidation();
        if (props.autofocus === true && props.noResetFocus !== true) {
          focus();
        }
      });
    }

    function focus () {
      addFocusFn(() => {
        if (rootRef.value === null) return

        const target = rootRef.value.querySelector('[autofocus][tabindex], [data-autofocus][tabindex]')
          || rootRef.value.querySelector('[autofocus] [tabindex], [data-autofocus] [tabindex]')
          || rootRef.value.querySelector('[autofocus], [data-autofocus]')
          || Array.prototype.find.call(rootRef.value.querySelectorAll('[tabindex]'), el => el.tabIndex !== -1);

        target !== null && target !== void 0 && target.focus({ preventScroll: true });
      });
    }

    provide(formKey, {
      bindComponent (vmProxy) {
        registeredComponents.push(vmProxy);
      },

      unbindComponent (vmProxy) {
        const index = registeredComponents.indexOf(vmProxy);
        if (index !== -1) {
          registeredComponents.splice(index, 1);
        }
      }
    });

    let shouldActivate = false;

    onDeactivated(() => {
      shouldActivate = true;
    });

    onActivated(() => {
      shouldActivate === true && props.autofocus === true && focus();
    });

    onMounted(() => {
      props.autofocus === true && focus();
    });

    // expose public methods
    Object.assign(vm.proxy, {
      validate,
      resetValidation,
      submit,
      reset,
      focus,
      getValidationComponents: () => registeredComponents
    });

    return () => h('form', {
      class: 'q-form',
      ref: rootRef,
      onSubmit: submit,
      onReset: reset
    }, hSlot(slots.default))
  }
});

export { __nuxt_component_1 as _, __nuxt_component_2 as a, useDark as b, useFieldProps as c, useFieldEmits as d, useField as e, useFieldState as f, addFocusFn as g, debounce as h, useFormProps as i, useFormInputNameAttr as j, fieldValueIsFilled as k, useKeyComposition as l, useDarkProps as u };
//# sourceMappingURL=QForm.mjs.map
