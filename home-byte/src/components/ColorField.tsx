import { Box, Typography, type TypographyProps } from "@mui/material";
import {
  type ComponentsOverrides,
  styled,
  useThemeProps,
} from "@mui/material/styles";
import type { CSSProperties, ElementType } from "react";
import {
  type FieldProps,
  sanitizeFieldRestProps,
  useFieldValue,
  useTranslate,
} from "react-admin";
import { normalizeInputColor } from "./ColorInput";

const PREFIX = "RaColorField";

type ColorFieldStyle = CSSProperties & Record<`--${string}`, string>;

export interface ColorFieldProps<
  RecordType extends Record<string, any> = Record<string, any>,
> extends FieldProps<RecordType>,
  Omit<TypographyProps, "textAlign"> {
  component?: ElementType<any>;
  showValue?: boolean;
}

export const ColorField = <
  RecordType extends Record<string, any> = Record<string, any>,
>(
  inProps: ColorFieldProps<RecordType>
) => {
  const props = useThemeProps({
    props: inProps,
    name: PREFIX,
  });

  const {
    className,
    emptyText,
    showValue = true,
    style,
    ...rest
  } = props;
  const translate = useTranslate();
  const value = useFieldValue(props);
  const color = normalizeInputColor(value);
  const displayValue =
    value != null && typeof value !== "string" ? value.toString() : value;
  const text =
    displayValue ||
    (emptyText ? translate(emptyText, { _: emptyText }) : null);

  return (
    <StyledTypography
      component="span"
      variant="body2"
      className={className}
      style={
        {
          ...style,
          "--ColorField-color": color ?? "transparent",
        } as ColorFieldStyle
      }
      {...sanitizeFieldRestProps(rest)}
    >
      {color && <Box component="span" className="RaColorField-swatch" />}
      {showValue || !color ? text : null}
    </StyledTypography>
  );
};

const StyledTypography = styled(Typography, {
  name: PREFIX,
  overridesResolver: (_, styles) => styles.root,
})(({ theme }) => ({
  alignItems: "center",
  display: "inline-flex",
  gap: theme.spacing(0.75),
  minHeight: 20,
  verticalAlign: "middle",

  "& .RaColorField-swatch": {
    backgroundColor: "var(--ColorField-color)",
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "50%",
    display: "inline-block",
    flex: "0 0 auto",
    height: 16,
    width: 16,
  },
}));

declare module "@mui/material/styles" {
  interface ComponentNameToClassKey {
    [PREFIX]: "root";
  }

  interface ComponentsPropsList {
    [PREFIX]: Partial<ColorFieldProps>;
  }

  interface Components {
    [PREFIX]?: {
      defaultProps?: ComponentsPropsList[typeof PREFIX];
      styleOverrides?: ComponentsOverrides<
        Omit<Theme, "components">
      >[typeof PREFIX];
    };
  }
}
