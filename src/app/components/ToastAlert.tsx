export const ToastAlert = ({ error }: any) => {
  let commonError;
  if (error instanceof Error) {
    commonError = error.message
  }
  return (
    <div>
      {error?.inner ? (
        error.inner.map((item: any, index: number) => (
          <div key={index}>
            <span>{`- ${item.path}: ${item.message}.`}</span>
            <br />
          </div>
        ))
      ) : (
        <div>
          <span>{commonError}</span>
          <br />
        </div>
      )}
    </div>
  );
};
