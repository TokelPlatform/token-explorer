import withJoi from "next-joi";

export default withJoi({
  onValidationError: (__, res, error) => {
    res.status(400).json({error: error});
  },
});
