import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputAdornment,
  styled,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useTheme, useThemeProps } from "@mui/material/styles";
import type { CSSProperties, ReactNode } from "react";
import { useWatch } from "react-hook-form";
import {
  FieldTitle,
  InputHelperText,
  type InputProps,
  sanitizeInputRestProps,
  useInput,
  useResourceContext,
  useTranslate,
} from "react-admin";

type ColorInputProps = Omit<InputProps<string>, "source"> &
  Omit<
    TextFieldProps,
    | "defaultValue"
    | "helperText"
    | "label"
    | "name"
    | "onBlur"
    | "onChange"
    | "source"
    | "type"
    | "value"
  > & {
    source?: string;
    showPreview?: boolean;
    watchField?: string;
    previewLabel?: ReactNode;
  };

type ColorInputStyle = CSSProperties & Record<`--${string}`, string>;

const PREFIX = "RaColorInput";

export const normalizeInputColor = (value: unknown) => {
  if (typeof value !== "string") return undefined;

  const color = value.trim();

  if (/^#[0-9a-f]{6}$/i.test(color)) {
    return color.toLowerCase();
  }

  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return `#${color
      .slice(1)
      .split("")
      .map((character) => `${character}${character}`)
      .join("")}`.toLowerCase();
  }

  return undefined;
};

const getColorInputClassName = (source: string, className?: string) =>
  ["ra-input", `ra-input-${source}`, className].filter(Boolean).join(" ");

const translationKeyRegex = /^[a-zA-Z0-9_-]+\.[a-zA-Z0-9_.-]+$/;

export const ColorInput = (inProps: ColorInputProps) => {
  const props = useThemeProps({
    props: inProps,
    name: PREFIX,
  });

  const {
    className,
    defaultValue,
    disabled,
    format,
    helperText,
    label,
    margin = "dense",
    onBlur,
    onChange,
    parse,
    previewLabel,
    readOnly,
    resource: resourceProp,
    showPreview = true,
    source = "color",
    validate,
    variant,
    watchField,
    ...rest
  } = props;
  const { InputProps, ...sanitizedRest } = sanitizeInputRestProps(rest);

  const {
    field,
    fieldState: { error, invalid },
    id,
    isRequired,
  } = useInput({
    defaultValue,
    disabled,
    format,
    onBlur,
    onChange,
    parse,
    readOnly,
    resource: resourceProp,
    source,
    validate,
    ...rest,
  });

  const theme = useTheme();
  const resource = useResourceContext(props);
  const selectedColor = normalizeInputColor(field.value);
  const translate = useTranslate();
  const pickerValue = selectedColor;
  const isDisabled = disabled || readOnly;
  const renderHelperText = helperText !== false || invalid;
  const translationKey = typeof previewLabel === "string" ? previewLabel : "ra.message.preview";
  const translatedPreviewLabel = translate(translationKey, { _: translationKeyRegex?.test(translationKey) ? "Preview" : previewLabel });

  const previewName = useWatch({
    name: watchField ?? source,
  });

  const preview =
    typeof previewName === "string" && previewName.trim()
      ? previewName
      : translatedPreviewLabel;

  const getContrastText = (color?: string) => {
    if (!color) return theme.palette.text.primary;

    try {
      return theme.palette.getContrastText(color);
    } catch {
      return theme.palette.text.primary;
    }
  };

  const clearColor = () => {
    if (isDisabled || !selectedColor) return;

    field.onChange("");
    field.onBlur();
  };

  return (
    <StyledColorInput
      className={getColorInputClassName(source, className)}
      disabled={disabled}
      error={invalid}
      fullWidth={rest.fullWidth}
      margin={margin}
      style={
        {
          "--ColorInput-selected": selectedColor ?? "transparent",
          "--ColorInput-preview-color": getContrastText(selectedColor),
        } as ColorInputStyle
      }
      variant={variant}
    >
      <Box className="RaColorInput-row">
        <TextField
          id={id}
          {...field}
          {...sanitizedRest}
          className="RaColorInput-picker"
          disabled={disabled}
          error={invalid}
          fullWidth={false}
          helperText={
            renderHelperText ? (
              <InputHelperText error={error?.message} helperText={helperText} />
            ) : null
          }
          InputProps={{
            ...InputProps,
            endAdornment: (
              <>
                {InputProps?.endAdornment}
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Clear color"
                    className="RaColorInput-clear"
                    disabled={isDisabled || !selectedColor}
                    edge="end"
                    onClick={clearColor}
                    size="small"
                    title="Clear color"
                    type="button"
                  >
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              </>
            ),
          }}
          InputLabelProps={{ shrink: true }}
          label={
            label !== "" && label !== false ? (
              <FieldTitle
                label={label}
                source={source}
                resource={resource}
                isRequired={isRequired}
              />
            ) : null
          }
          onChange={(event) => field.onChange(event)}
          readOnly={readOnly}
          type="color"
          value={pickerValue}
          variant={variant}
        />

        {showPreview && preview && (
          <Chip className="RaColorInput-preview" size="small" label={preview} />
        )}
      </Box>
    </StyledColorInput>
  );
};

const StyledColorInput = styled(FormControl, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  marginTop: theme.spacing(1),
  "& .RaColorInput-row": {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
  },
  "& .RaColorInput-picker": {
    width: 128,
  },
  "& .RaColorInput-clear": {
    flex: "0 0 auto",
  },
  "& .RaColorInput-preview": {
    backgroundColor: "var(--ColorInput-selected)",
    color: "var(--ColorInput-preview-color)",
  },
}));
