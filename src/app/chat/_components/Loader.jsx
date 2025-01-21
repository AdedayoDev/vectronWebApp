const Loader = () => {
    return (
      <div className="flex space-x-2">
        {[1, 2, 3].map((index) => (
          <div
            key={index}
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          />
        ))}
      </div>
    );
  };
  
  export default Loader;