package xyz.codevomit.demostreamer;

/**
 *
 * @author merka
 */
public class RandomNumber 
{
    public enum SourceType{
        SERVER,
        CLIENT
    }
    
    private Long value;
    private Long sequenceNumber;
    private SourceType sourceType;   

    public SourceType getSourceType() {
        return sourceType;
    }

    public void setSourceType(SourceType sourceType) {
        this.sourceType = sourceType;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Long getSequenceNumber() {
        return sequenceNumber;
    }

    public void setSequenceNumber(Long sequenceNumber) {
        this.sequenceNumber = sequenceNumber;
    }

    public RandomNumber(){
        
    }
    
    public RandomNumber(Long value, Long sequenceNumber) {
        this.value = value;
        this.sequenceNumber = sequenceNumber;
        this.sourceType = sourceType.SERVER;
    }

    public RandomNumber(Long value, Long sequenceNumber, SourceType sourceType) {
        this.value = value;
        this.sequenceNumber = sequenceNumber;
        this.sourceType = sourceType;
    }
}
