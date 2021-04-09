import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  .dark {
    .modal-card {
        background: linear-gradient(23.12deg, rgba(96, 95, 148, 0.36) 2.05%, rgba(245, 244, 255, 0.12) 104.3%) !important;
  border: 1px solid rgba(171,158,249,0.8) !important;
  backdrop-filter: blur(110px) !important;
  border-radius: 20px !important;
      }

      .glassmorphismCard {
        background: linear-gradient(136.45deg, rgba(255, 255, 255, 0.7) 23.59%, rgba(255, 255, 255, 0) 179.98%) !important;
        border: 1px solid #FFFFFF !important;
        box-sizing: border-box !important;
        backdrop-filter: blur(20px) !important;
        border-radius: 20px !important;
      }

      .glassmorphismCard2 {
        background: rgba( 255, 255, 255, 0.45 ) !important;
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )!important;
        backdrop-filter: blur( 4px ) !important;
        -webkit-backdrop-filter: blur( 4px ) !important;
        border-radius: 10px !important;
        border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
      }

  }

  .light {
    .modal-card {
        background: linear-gradient(45deg, rgba(96,95,148,0.6), rgba(245,244,255,0.2)) !important;
        border: 1px solid rgba(171,158,249,0.8) !important;
        border-radius: 20px !important;
      }

      .glassmorphismCard {
        background: linear-gradient(136.45deg, rgba(255, 255, 255, 0.7) 23.59%, rgba(255, 255, 255, 0) 179.98%) !important;
        border: 1px solid #FFFFFF !important;
        box-sizing: border-box !important;
        backdrop-filter: blur(20px) !important;
        border-radius: 20px !important;
      }

      .glassmorphismCard2 {
        background: rgba( 255, 255, 255, 0.45 ) !important;
        box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 )!important;
        backdrop-filter: blur( 4px ) !important;
        -webkit-backdrop-filter: blur( 4px ) !important;
        border-radius: 10px !important;
        border: 1px solid rgba( 255, 255, 255, 0.18 ) !important;
      }
  }
`;

export default GlobalStyle;
