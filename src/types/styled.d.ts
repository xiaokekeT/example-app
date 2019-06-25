// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;

    colors: {
      main: string;
      secondary: string;
      black: string;
    };

    fontSize: {
      h1: number;
    };
  }
}
