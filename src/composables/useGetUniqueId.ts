export function useGetUniqueId() {
    function chr4() {
        return Math.random().toString(16).slice(-4);
    }

    function generate(): string {
        return `uid-${chr4()}${chr4()}-${chr4()}-${chr4()}-${chr4()}-${chr4()}${chr4()}${chr4()}`;
    }


    return {
        getId: generate
    };
}