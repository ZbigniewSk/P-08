const Trackable = require('../../BuildBus/Trackable');
/**
 * A module that third party code can modify.
 *
 * When Webpack loads a module into its bundles, it processes the source code
 * through a set of rules generated by Buildpack. A TargetableModule is a reference
 * to that source file, meant to be passed to interceptors. Inside
 * interceptors, extensions and projects can configure the TargetableModule to
 * transform it in many ways.
 */
class TargetableModule extends Trackable {
    /**
     * Create a TargetableModule representing a file.
     * @param {string} file - Path to the underlying source file.
     * @param {Trackable} trackingOwner - Parent object for debugging purposes.
     */
    constructor(file, trackingOwner) {
        super();
        this.file = file;
        this._queuedTransforms = [];
        this.attach(this.file, trackingOwner);
    }
    /**
     * Add a transform request to this module's queue. The `fileToTransform` of
     * the transform request is automatically set to this module's filename.
     *
     * @param {TransformType} type - [Transform type][]
     * @param {string} transformModule - The Node module that runs the transform, such as a Webpack loader for type `source` or a Babel plugin for type `babel`.
     * @param {Object} options - Configuration object to send to the transformModule.
     *
     * @return { this }
     * @chainable
     */
    addTransform(type, transformModule, options) {
        const request = this._createTransform(type, transformModule, options);
        this._queuedTransforms.push(request);
        this.track('addTransform', request);
        return this;
    }
    /**
     * Empty this module's queue of transforms, returning them as an array.
     *
     * @returns {TransformRequest[]} An array of [Transform requests][].
     */
    flush() {
        return this._queuedTransforms.splice(0, this._queuedTransforms.length);
    }
    /**
     * Insert text into the module contents, immediately following the location
     * of the search string if it is found.
     *
     * @param {string} after - Text string in the module code to place the new content after.
     * @param {string} insert - Text to insert after the search string.
     * @param {Object} [options] - Additional loader options.
     * @param {number} [options.remove] - Number of characters to delete forward, after the search string.
     *
     * @return { this }
     * @chainable
     */
    insertAfterSource(after, insert, options = {}) {
        return this.spliceSource({
            after,
            insert,
            ...options
        });
    }
    /**
     * Insert text into the module contents, immediately before the location
     * of the search string if it is found.
     *
     * @param {string} before - Text string in the module code to place the new content before.
     * @param {string} insert - Text to insert before the search string.
     * @param {Object} [options] - Additional loader options.
     * @param {number} [options.remove] - Number of characters to delete forward, after the search string.
     *
     * @return { this }
     * @chainable
     */
    insertBeforeSource(before, insert, options = {}) {
        return this.spliceSource({
            before,
            insert,
            ...options
        });
    }
    /**
     * Add text to the beginning of a file.
     *
     * @param {string} insert - Text to insert up top
     *
     * @return { this }
     * @chainable
     */
    prependSource(insert) {
        return this.spliceSource({ at: 0, insert });
    }
    /**
     * Do any splice operation supported by [`splice-source-loader`][].
     *
     * @param {object} instruction - Splice instruction.
     *
     * @return { this }
     * @chainable
     * @memberof TargetableModule
     */
    spliceSource(instruction) {
        return this.addTransform(
            'source',
            '@magento/pwa-buildpack/lib/WebpackTools/loaders/splice-source-loader',
            instruction
        );
    }
    /** @ignore */
    _createTransform(type, transformModule, options) {
        return {
            type,
            fileToTransform: this.file,
            transformModule,
            options
        };
    }
}

module.exports = TargetableModule;