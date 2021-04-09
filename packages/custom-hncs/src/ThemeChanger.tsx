import { Icon } from "@polkadot/react-components";
// import { ThemeContext } from "@polkadot/apps/AppsWrapper";

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { BareProps as Props } from "@polkadot/react-components/types";
import useStorage from "./hooks/useStorage";

function ThemeChanger({
  className,
  children,
}: Props): React.ReactElement<Props> {
  const themeContext = useContext(ThemeContext);
  const [_, setLastValue] = useStorage("options:DarkTheme");

  useEffect(() => {
    setLastValue(themeContext.isDark);
  }, []);

  const toggleTheme = () => {
    setLastValue(!themeContext.isDark);
    themeContext.setDarkTheme(!themeContext.isDark);
  };

  return (
    <div className={`${className}`}>
      <Icon
        onClick={toggleTheme}
        icon="moon"
        className={`${themeContext.isDark ? "active-theme" : ""}`}
      />
      <Icon
        onClick={toggleTheme}
        icon="sun"
        className={`${!themeContext.isDark ? "active-theme" : ""}`}
      />
    </div>
  );
}

export default React.memo(styled(ThemeChanger)`
  display: flex;
  margin: 16px;

  .svg-inline--fa {
    font-size: 18px;
    margin-right: 16px;
    color: ${(props) => props.theme.textlight};
  }

  .active-theme {
    color: ${(props) => props.theme.highlight};
  }
`);
