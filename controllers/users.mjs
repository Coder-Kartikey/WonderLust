import  User from "../models/user.js";

const renderSignupForm = (req,res) => {
        // res.send("Sign Up Page");
        res.render("users/signup");
};

const userSignup = async (req,res) => {
        try{
                const { email, username, password } = req.body;
                const user = new User({ email, username });
                const registeredUser = await User.register(user, password);
                req.login(registeredUser, err => {
                        if(err) return next(err);
                        req.flash("success", "Welcome to Wonderlust!");
                        res.redirect("/listings");
                });
        } catch(e){
                req.flash("error", e.message);
                res.redirect("/signup");
        }
};

const renderLoginForm = (req,res) => {
        res.render("users/login");
};

const userLogin = (req,res) => {
        req.flash("success", "Welcome back!");
        const redirectUrl = res.locals.returnTo || "/listings";
        delete res.locals.returnTo;
        res.redirect(redirectUrl);
};

const userLogout = (req,res) => {
        req.logout((err) => {
                if(err) return next(err);
                req.flash("success", "Goodbye!");
                res.redirect("/listings");
        });
};

export default{ renderSignupForm, userSignup, renderLoginForm, userLogin, userLogout };