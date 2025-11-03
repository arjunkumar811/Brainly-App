// Twitter Widget Manager - Singleton pattern for efficient widget loading
declare global {
    interface Window {
        twttr: any;
    }
}

class TwitterWidgetManager {
    private static instance: TwitterWidgetManager;
    private isLoaded: boolean = false;
    private loadPromise: Promise<void> | null = null;
    private callbacks: (() => void)[] = [];
    private renderedTweets: Set<string> = new Set();

    private constructor() {
        // Check localStorage for cached state
        const cachedState = localStorage.getItem('twitter_widget_loaded');
        if (cachedState === 'true') {
            this.checkIfAlreadyLoaded();
        } else {
            this.checkIfAlreadyLoaded();
        }
        
        // Load rendered tweets cache
        try {
            const cachedTweets = localStorage.getItem('rendered_tweets');
            if (cachedTweets) {
                this.renderedTweets = new Set(JSON.parse(cachedTweets));
            }
        } catch (error) {
            console.error('Error loading rendered tweets cache:', error);
        }
    }

    public static getInstance(): TwitterWidgetManager {
        if (!TwitterWidgetManager.instance) {
            TwitterWidgetManager.instance = new TwitterWidgetManager();
        }
        return TwitterWidgetManager.instance;
    }

    private checkIfAlreadyLoaded() {
        if (window.twttr && window.twttr.widgets) {
            this.isLoaded = true;
            localStorage.setItem('twitter_widget_loaded', 'true');
            return;
        }

        // Check if script is already in the document
        const existingScript = document.querySelector('script[src*="platform.twitter.com"]');
        if (existingScript) {
            this.waitForLoad();
        }
    }

    private waitForLoad() {
        if (!this.loadPromise) {
            this.loadPromise = new Promise((resolve) => {
                const checkInterval = setInterval(() => {
                    if (window.twttr && window.twttr.widgets) {
                        this.isLoaded = true;
                        localStorage.setItem('twitter_widget_loaded', 'true');
                        clearInterval(checkInterval);
                        this.executeCallbacks();
                        resolve();
                    }
                }, 50); // Check every 50ms instead of 100ms for faster response

                // Timeout after 10 seconds
                setTimeout(() => {
                    clearInterval(checkInterval);
                    resolve();
                }, 10000);
            });
        }
        return this.loadPromise;
    }

    private executeCallbacks() {
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
    }

    public async ensureLoaded(): Promise<boolean> {
        if (this.isLoaded) {
            return true;
        }

        await this.waitForLoad();
        return this.isLoaded;
    }

    public onReady(callback: () => void) {
        if (this.isLoaded) {
            callback();
        } else {
            this.callbacks.push(callback);
            this.waitForLoad();
        }
    }

    public renderTweet(
        tweetId: string,
        container: HTMLElement,
        options: any = {},
        onComplete?: () => void
    ): void {
        this.onReady(() => {
            if (window.twttr && window.twttr.widgets && container) {
                container.innerHTML = '';
                
                window.twttr.widgets.createTweet(
                    tweetId,
                    container,
                    {
                        theme: 'light',
                        conversation: 'none',
                        cards: 'visible',
                        align: 'center',
                        ...options
                    }
                ).then(() => {
                    this.renderedTweets.add(tweetId);
                    try {
                        localStorage.setItem('rendered_tweets', JSON.stringify(Array.from(this.renderedTweets)));
                    } catch (error) {
                        this.renderedTweets.clear();
                        localStorage.removeItem('rendered_tweets');
                    }
                    if (onComplete) {
                        onComplete();
                    }
                });
            }
        });
    }
}

export const twitterWidgetManager = TwitterWidgetManager.getInstance();
