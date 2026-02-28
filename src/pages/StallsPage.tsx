import FetchStalls from "../components/FetchStalls"

const StallsPage = () => {

    return (
    <div className="min-h-screen bg-background dark">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="container max-w-4xl mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                {/* <Store className="w-5 h-5 text-primary-foreground" /> */}
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Food Stalls</h1>
                <p className="text-sm text-muted-foreground">
                  Discover delicious local eats
                </p>
              </div>
            </div>
          </div>
        </header>
    
          {/* Main Content */}
        <main className="container max-w-4xl mx-auto px-4 py-6">
          <FetchStalls />
        </main>
      </div>
    )
}


export default StallsPage