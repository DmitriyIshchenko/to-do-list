import styled from 'styled-components';

const StyledProgressBar = styled.div`
    height: 4px;
    width: ${props => props.progress + "%"};
    background: ${props => props.colorTheme};
    border-radius: 5px ${props => props.progress === 100 ? "5px" : 0} 0 0;
`
export default StyledProgressBar;
