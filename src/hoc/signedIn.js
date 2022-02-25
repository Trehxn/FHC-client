import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

const signedIn = (Component) => {
    const ComposedComponent = ({ isSignedIn, ...rest }) => {
        const navigate = useNavigate();

        useEffect (() => {
            if(isSignedIn) {
                navigate("/", { replace: true })
            }
        }, [isSignedIn, navigate])

        return <Component {...rest} />
    }

    const mapStateToProps = (state) => {
        return { isSignedIn: state.auth.isSignedIn }
    }

    return connect(mapStateToProps)(ComposedComponent);
}

export default signedIn;