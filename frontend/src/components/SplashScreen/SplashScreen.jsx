import { SplashContainer, LogoContainer, Logo} from "./SplashScreen.styled";

const SplashScreen = ({ onFinish }) => {
  return (
    <SplashContainer>
      <LogoContainer>
        <Logo src="/assets/img/logoruhama.png" alt="Logo" />
      </LogoContainer>
    </SplashContainer>
  );
};

export default SplashScreen;
